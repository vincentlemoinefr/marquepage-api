# syntax=docker/dockerfile:1
# check=error=true

FROM node:lts-alpine3.20

ARG BUILD_DATE
ARG BUILD_VERSION
LABEL BUILD_DATE=$BUILD_DATE
LABEL BUILD_VERSION=$BUILD_VERSION

RUN mkdir -p /marquepage
WORKDIR /marquepage
COPY . .

RUN npm ci

EXPOSE 3000

ENTRYPOINT ["npm", "run", "start"]