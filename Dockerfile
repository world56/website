FROM node:20.9.0-alpine

WORKDIR /app

RUN mkdir -p builder

COPY package*.json ./builder
COPY ./prisma ./builder/prisma
COPY ./public ./builder/public
COPY ./src ./builder/src
COPY ./next.config.js ./builder/next.config.js
COPY ./postcss.config.js ./builder/postcss.config.js
COPY ./tailwind.config.js ./builder/tailwind.config.js
COPY ./tsconfig.json ./builder/tsconfig.json
COPY entrypoint.sh ./entrypoint.sh
RUN chmod +x ./entrypoint.sh

WORKDIR /app/builder

RUN npm i --verbose
RUN npx prisma generate

ENTRYPOINT ["/app/entrypoint.sh"]

WORKDIR /app

ENV PORT=3000
ENV HOSTNAME=0.0.0.0

EXPOSE 3000

CMD ["node", "server.js"]