import React, { useState, useContext, FunctionComponent } from 'react'
import CredentialProvider from '../credentials/provider'
import type { CredentialProps } from '../credentials/provider'
import Jenkins from './jenkins'
import Gitea from './gitea'
import Gitlab from './gitlab'
import Keptn from './keptn'
import Dynatrace from './dynatrace'
import Kubernetes from './kubernetes'
import Awx from './awx'
import CloudAutomation from './cloudautomation'

type TabsProps = {
  [tab: string]: FunctionComponent
}

type CredentialsProps = {
  jenkins: CredentialProps
	gitea: CredentialProps
	gitlab: CredentialProps
	awx: CredentialProps
	keptnBridge: CredentialProps
	keptnApi: CredentialProps
	dynatrace: CredentialProps
	cloudAutomation: CredentialProps
  kubernetes: CredentialProps
}

const generateTabOptions = ({ dynatrace, jenkins, gitea, keptnBridge, kubernetes, awx, gitlab, cloudAutomation }: CredentialsProps) => {
  const tabs: TabsProps = {}

  if (dynatrace.isEnabled) {
    tabs['Dynatrace'] = Dynatrace
  }

  if (jenkins.isEnabled) {
    tabs['Jenkins'] = Jenkins
  }

  if (gitea.isEnabled) {
    tabs['Gitea'] = Gitea
  }

  if (keptnBridge.isEnabled) {
    tabs['Keptn'] = Keptn
  }

  if (kubernetes.isEnabled) {
    tabs['Kubernetes'] = Kubernetes
  }

  if (awx.isEnabled) {
    tabs['Awx'] = Awx
  }

  if (gitlab.isEnabled) {
    tabs['Gitlab'] = Gitlab
  }

  if (cloudAutomation.isEnabled) {
    tabs['CloudAutomation'] = CloudAutomation
  }

  return tabs
}

type ToolTabsProps = {}

const ToolTabs: FunctionComponent<ToolTabsProps> = () => {
  const credentials = useContext(CredentialProvider)
  const tabs = generateTabOptions(credentials)
  const defaultTab = Object.keys(tabs).length > 0 ? Object.keys(tabs)[0] : null

  const [activeTab, setActiveTab] = useState(defaultTab)
  const ActiveTabContent = tabs[activeTab || '']

  return (
    <>
      <div className="tabs" style={{ marginBottom: "13px" }}>
        {
          Object.keys(tabs).map((tab, key) => {
            const isActive = tab === activeTab

            return (
              <button
                key={key}
                className={`tab ${isActive ? "is-active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            )
          })
        }
      </div>
      <div>
        {
          activeTab
            ? <ActiveTabContent />
            : <>No tools set up yet...</>
        }
      </div>
    </>
  )
}

type HowToProps = {}

const HowTo: FunctionComponent<HowToProps> = () => {
  const { awx, gitea, gitlab } = useContext(CredentialProvider)
  const { href: giteaHref } = gitea
  const { href: gitlabHref } = gitlab
  const { isEnabled: isAwxEnabled } = awx
  const { isEnabled: isGitLabEnabled } = gitlab

  return (
    <div>
      <>
        <h2>How-To</h2>
        <p>Welcome to your personal ACE Box! It comes with a set of already configured tools, code, pipelines, etc. to showcase a selection of cloud automation use cases.</p>
        <p>
          Before you get started, please familiarize yourself with the Dashboard you&apos;re currently looking at:
        </p>
        <ul>
          <li>A <b>How-To</b> gives you step-by-step instructions for each use case.</li>
          <li>As the name indicates, <b>Deployment Preview</b> shows you the currently deployed version of a demo application up in each stage. Don&apos;t worry, the error you&apos;re seeing is fine for now as the application is not deployed yet. You will fix this as part of one the first use cases.</li>
          <li><b>Links</b> lists tools and credentials that you will need while going through the use cases.</li>
        </ul>
        <p>
          In addition he following tools have been set up and configured (click on each tab to get an overview of what&apos;s been configured):
        </p>
      </>
      <ToolTabs />
      <>
        <h2>Use Cases</h2>
        <p>
          The following list shows use cases currently supported by ACE Box. Please follow the link for step-by-step instructions.
        </p>
        <dl className="definition-list">
          <dt>Quality Gates, Monitoring as a Service and Monitoring as Code - Demo using <b>Jenkins, Gitea and Cloud Automation</b></dt>
          <dd><a href={`${giteaHref}/demo/ace`} target="_blank" rel="noreferrer">Step-by-step instructions</a></dd>
          {/* Commenting as not part of demo flow -- needs to be enhanced in future<dt>Monaco - Hands-on Training</dt>
          <dd><a href={`${giteaHref}/monaco-hot/monaco-hot`}>Step-by-step instructions</a></dd>
          <dt>Quality Gates - Hands-on Training</dt>
          <dd><a href={`${giteaHref}/quality-gates-hot/lab-guides`} target="_blank" rel="noreferrer">Step-by-step instructions</a></dd> */}
          {
            isAwxEnabled &&
              <>
                <dt>Canary deployment and auto remediation - Demo using <b>Jenkins, Gitea and AWX</b></dt>
                <dd><a href={`${giteaHref}/demo/auto-remediation-docs`} target="_blank" rel="noreferrer">Step-by-step instructions</a></dd>
              </>
          }
          {
            isGitLabEnabled &&
              <>
                <dt>Quality Gates, Monitoring as a Service and Monitoring as Code - Demo using <b>GitLab and Cloud Automation</b></dt>
                <dd><a href={`${gitlabHref}/demo/ace/-/tree/main/demo/gitlab`} target="_blank" rel="noreferrer">Step-by-step instructions</a></dd>
              </>
          }
        </dl>
      </>
    </div>
  )
}

export { HowTo as default }
