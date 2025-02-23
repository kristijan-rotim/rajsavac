FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json .
COPY *config.js .
COPY *.config.js .

RUN npm install

COPY . .

EXPOSE 5173

CMD [ "npm", "run", "dev", "--", "--host", "0.0.0.0"]