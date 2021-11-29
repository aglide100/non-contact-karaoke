FROM node:lts-alpine

WORKDIR /usr/src/app

COPY package*.json ./

COPY . . 

RUN npm install --no-optional


RUN npm run build

WORKDIR /usr/src/app/ui

RUN npm install --no-optional

WORKDIR /usr/src/app

EXPOSE 3500

EXPOSE 8888

CMD "npm" "run" "start"