FROM maven:3.2-jdk-8

ENV sourcesdir /usr/src/mymaven

# Install JMeter
RUN wget https://archive.apache.org/dist/jmeter/binaries/apache-jmeter-4.0.tgz
RUN tar -xvzf apache-jmeter-4.0.tgz
RUN rm apache-jmeter-4.0.tgz

RUN mv apache-jmeter-4.0 /jmeter

ENV JMETER_HOME /jmeter

ENV PATH $JMETER_HOME/bin:$PATH

# Set Working DIR
WORKDIR ${sourcesdir}
