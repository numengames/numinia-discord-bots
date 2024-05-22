FROM node:20

ARG NUMINIA_NPM_TOKEN

WORKDIR /home/node/app

RUN npm install -g pm2 ts-node typescript

COPY .npmrc .
COPY package*.json .

RUN npm install \
  && rm -f .npmrc

COPY . .

EXPOSE 8000

CMD ["pm2-runtime", "ecosystem.config.js"]