FROM node:20

ARG NUMINIA_NPM_TOKEN

WORKDIR /home/node/app

COPY package*.json .npmrc ./

RUN npm install -g pm2 ts-node typescript \
  && npm install \
  && rm -f .npmrc

COPY . .

EXPOSE 8000

CMD ["pm2-runtime", "start", "ecosystem.config.js"]