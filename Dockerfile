FROM node:20

WORKDIR /home/node/app

RUN npm install pm2 -g

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8000

CMD ["pm2-runtime", "ecosystem.config.js"]