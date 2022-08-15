FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY ./dist ./dist

ENV PORT=7000

EXPOSE 7000

CMD [ "npm", "run", "start:dev" ]