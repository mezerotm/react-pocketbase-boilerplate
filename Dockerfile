FROM node:18-alpine

VOLUME /data

WORKDIR /workspace

RUN apk add --no-cache unzip wget dumb-init

COPY webapp webapp

ENV PB_VERSION=0.10.4

RUN wget https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_amd64.zip -O pocketbase.zip
RUN unzip pocketbase.zip -d webapp/server/
RUN rm pocketbase.zip

RUN npm --prefix webapp install webapp

ENTRYPOINT [ "dumb-init", "npm", "--prefix", "webapp", "run", "start" ]