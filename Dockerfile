FROM node:lts-alpine3.20

RUN mkdir -p /marquepage

WORKDIR /marquepage

COPY . .

RUN npm ci

EXPOSE 3000

ENTRYPOINT ["npm", "run", "start"]