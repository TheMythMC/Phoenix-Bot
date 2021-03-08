FROM node:14

WORKDIR /usr/src/core

COPY package*.json ./

RUN npm install

COPY . .

CMD ["node", "."]