FROM node:12-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

ENV MONGODB_URI=mongodb://localhost:27017/tindev

EXPOSE 3333

CMD yarn dev
