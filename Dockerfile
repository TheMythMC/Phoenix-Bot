FROM node:12-alpine

WORKDIR /usr/src/core

COPY package*.json ./

RUN apk update && apk add bash && apk add curl

RUN npm install

COPY . .

RUN npm run start

CMD ["/bin/bash"]