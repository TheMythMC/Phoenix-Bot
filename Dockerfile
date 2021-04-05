FROM node:15-alpine

WORKDIR /usr/src/extra

COPY package*.json ./

RUN echo 'http://mirror.ette.biz/alpine/v3.13/main \
http://mirror.ette.biz/alpine/v3.13/community'

RUN apk update && apk add bash && apk add curl && apk add openjdk11-jdk

RUN npm install

COPY . .

RUN npm run start

CMD ["/bin/bash"]