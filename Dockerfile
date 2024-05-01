FROM node:20 AS build

WORKDIR /home/node/app

RUN npm install pm2 -g

COPY package*.json ./

RUN npm install

COPY . .

CMD ["pm2-runtime", "ecosystem.config.js"]