import requests, json, logging, os, sys, time, configparser
import pandas as pd
import matplotlib.pyplot as plt
import plotly.graph_objects as go
import plotly.express as px
import numpy as np
import pandasql as ps

# Initialize config parser
config = configparser.ConfigParser(interpolation=None)
config.read('config.ini')

# Input parameters
DT_URL = config['DT']['tenant']
DT_TOKEN = config['DT']['token']
tag = config['TAG']['key']

headers={}
headers["Authorization"] = "Api-Token "+DT_TOKEN
headers["Content-Type"] = "application/json"

def saveProblemsIntoExcel():
    # Get all problems
    parameters = {
            "pageSize": 10,
            "from": "now-7d",
            "fields": "impactAnalysis, evidenceDetails"
        }
    r = requests.get(DT_URL+'/api/v2/problems', params=parameters, headers=headers)
    content = r.json()
    entities = content['problems']
    i=0

    # I cannot use those in combination with nextPageKey
    del parameters['pageSize']
    del parameters['from']

    # Get more problems
    while (content.get("nextPageKey") is not None) and (i<30):
        parameters["nextPageKey"]=content.get("nextPageKey")

        r = requests.get(DT_URL+'/api/v2/problems', headers=headers, params=parameters)
        content = r.json()
        entities = entities + content['problems']
        print("Collecting more problems...")
        i+=1

    # Structure it in a pandas
    df = pd.json_normalize(entities)
    
    # Save to excel file/sheet
    writer = pd.ExcelWriter('problems.xlsx')
    df.to_excel(writer, sheet_name='Sheet1')
    writer.save()
    return df


def calculateExtraRows():
    df = pd.read_excel('problems.xlsx', sheet_name='Sheet1', index_col=0)

    # Extract tag from entityTags
    i=0
    for index, row in df.iterrows():
        str_res = df.loc[index, 'entityTags']
        str_res = str_res.replace("'", "\"")
        res = json.loads(str_res)
        k=0
        while k < len(res):
            if 'key' in res[k]:
                if res[k]['key'] == tag:
                    df.loc[index, tag] = res[k]['value']
            k+=1

    # Calculate range of duration
    for index, row in df.iterrows():
        if df.loc[index, 'endTime'] != -1:
            df.loc[index, 'duration_in_milli'] = df.loc[index, 'endTime'] - df.loc[index, 'startTime']


    # Save to excel file/sheet
    writer = pd.ExcelWriter('problems.xlsx')
    df.to_excel(writer, sheet_name='Sheet1')
    writer.save()

def plotProblemsPerTag(war, red):
    df = pd.read_excel('problems.xlsx', sheet_name='Sheet1', index_col=0)
    df = df['ms-id'].value_counts()
    plot_df = pd.DataFrame()
    plot_df['index'] = df.index.values
    plot_df['values'] = df.values
    z=[12,24,48]
    fig = go.Figure()

    def SetColor(y):
        if(y >= red):
            return "red"
        elif(y >= war):
            return "yellow"
        elif(y >= 0):
            return "green"

    fig.add_trace(go.Bar(x=plot_df['index'], 
                         y=plot_df['values'],
                         marker=dict(color = list(map(SetColor, plot_df['values'])))
                        )
                 )
    
    fig.update_layout(title="Problems per Team | Last 7 days", 
                      xaxis_title="Team",
                      yaxis_title="# of Problems",
                      font=dict(family="Bernina Sans",size=12,color="Grey")
                      )

    fig.show()
    

def plotProblemsTimerange(tagValue):
    df = pd.read_excel('problems.xlsx', sheet_name='Sheet1', index_col=0)
    if tagValue != None:
        df = df.loc[df[tag] == tagValue]
    bins = [0, 300000, 600000, 900000, 1200000, 1500000, 1800000, 2100000, 2400000, 2700000, 3000000, 1000000000000]    
    bins_axis = ['0m to 5m', '5m to 10m', '10m to 15m', '15m to 20m', '20m to 25m', '25m to 30m', '30m to 35m', '35m to 40m', '40m to 45m', '45m to 50m', 'more than 55m...']
    plot_df = pd.DataFrame()
    plot_df['index'] = df.groupby(pd.cut(df['duration_in_milli'], bins=bins)).duration_in_milli.count().index.values
    plot_df['values'] = df.groupby(pd.cut(df['duration_in_milli'], bins=bins)).duration_in_milli.count().values
    
    z=[12,24,48]
    fig = go.Figure()

    def SetColor(x):
        if(x == '0m to 5m'):
            return "red"
        elif(x == '5m to 10m'):
            return "red"
        elif(x == '10m to 15m'):
            return "yellow"
        elif(x == '15m to 20m'):
            return "yellow"
        elif(x == '20m to 30m'):
            return "yellow"
        else:
            return "green"

    fig.add_trace(go.Bar(x=bins_axis, 
                         y=plot_df['values'],
                         marker=dict(color = list(map(SetColor, bins_axis)))
                        )
                 )
    
    fig.update_layout(title="# of Problems based on Duration | Last 7 days", 
                      xaxis_title="Duration",
                      yaxis_title="# of Problems",
                      font=dict(family="Bernina Sans",size=12,color="Grey")
                      )

    fig.show()

def multidimensionalPlot(x, groupby, name, tagValue):
    # Load data
    df = pd.read_excel('problems.xlsx', sheet_name='Sheet1', index_col=0)

    if tagValue != None:
        df = df.loc[df[tag] == tagValue]

    if groupby == 'timerange':
        # Grouping timerange
        bins = [0, 300000, 600000, 900000, 1200000, 1500000, 1800000, 2100000, 2400000, 2700000, 3000000, 1000000000000]    
        bins_axis = ['0m to 5m', '5m to 10m', '10m to 15m', '15m to 20m', '20m to 25m', '25m to 30m', '30m to 35m', '35m to 40m', '40m to 45m', '45m to 50m', 'more than 55m...']
        
        # Create extra column with the range that the row belongs
        df[groupby] = pd.cut(df['duration_in_milli'], bins=bins, right=False, labels=bins_axis)

        # Group by x condition (input) and range, count the values
        plot_df = df.groupby(x)[groupby].value_counts().sort_values(ascending=False)
        
        # Reset index
        plot_df = plot_df.reset_index(name="Count")

        # Rename level_1 to timerange
        plot_df.rename(columns={'level_1': groupby}, inplace=True)

        fig = px.bar(plot_df, x=x, y=plot_df["Count"], color=groupby, title=name)
        fig.show()
    else:
        plot_df = df.groupby(x)[groupby].value_counts().sort_values(ascending=False)
        plot_df = plot_df.reset_index(name="Count")
        fig = px.bar(plot_df, x=x, y="Count", color=groupby, title=name)
        fig.show()
    

#df = saveProblemsIntoExcel()
#df = calculateExtraRows()

##########################
# Single Dimension Plots #
##########################
#plotProblemsPerTag(war=3, red=10)

# If you want the problems related to a specific team/tag, add it as tagValue
# If not, tagValue=None
#plotProblemsTimerange(tagValue=None)
#plotProblemsTimerange(tagValue='am-casa')


##########################
# Multidimensional Plots #
##########################

# Select what dimension is your x-axis
# Select the 2nd dimension, colors in groupBy
# y-axis will be the count of the combination of both
multidimensionalPlot(x='severityLevel', groupby='impactLevel', name="Severity Level vs Impact Level", tagValue='am-casa')
#multidimensionalPlot(x='severityLevel', groupby='timerange', name="Severity Level vs Timerange", tagValue=None)
#multidimensionalPlot(x='title', groupby='timerange', name="Severity Level vs Timerange | All", tagValue=None)