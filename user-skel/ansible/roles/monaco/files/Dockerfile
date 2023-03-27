FROM alpine:3.17.0

ARG MONACO_VERSION

ADD https://github.com/dynatrace-oss/dynatrace-monitoring-as-code/releases/download/$MONACO_VERSION/monaco-linux-amd64 /usr/local/bin/monaco
RUN chmod +x /usr/local/bin/monaco

CMD ["monaco"]
