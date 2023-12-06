# next.js SSG 是 npm run build 阶段构建生成的
# 所以应 先本地 npm run build 之后，在执行docker build

FROM node:20.9.0-alpine

WORKDIR /app

COPY package*.json ./

COPY ./.next ./.next

COPY ./prisma ./prisma

COPY ./public ./public

COPY ./resource ./resource

COPY ./next.config.js ./next.config.js

RUN npm i --production --loglevel info

RUN npx prisma generate

EXPOSE 3000

CMD npx prisma db push && npm start
