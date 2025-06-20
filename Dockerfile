FROM node:22-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i --only=production

COPY . .

ENTRYPOINT ["npm", "start"]
