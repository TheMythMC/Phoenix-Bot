FROM node:15-alpine

WORKDIR /usr/src/extra

COPY package*.json ./

RUN apk update && apk add bash && apk add curl

RUN npm install

COPY . .

RUN npm run start

CMD ["/bin/bash"]