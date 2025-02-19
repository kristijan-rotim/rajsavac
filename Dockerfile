FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json .
COPY *config.js .

RUN npm install

COPY . .

EXPOSE 5173

ENV HOST=0.0.0.0

CMD [ "npm", "run", "dev", "--", "--host", "0.0.0.0"]