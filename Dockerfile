FROM node:14-alpine

WORKDIR /usr/src/core

COPY package.json ./

RUN apk update && apk upgrade && apk add curl && yarn

COPY . .

ENTRYPOINT docker/launch.sh