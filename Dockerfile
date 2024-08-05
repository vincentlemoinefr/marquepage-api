# syntax=docker/dockerfile:1
# check=error=true

FROM node:lts-alpine

ARG BUILD_DATE
ARG BUILD_VERSION
LABEL BUILD_DATE=$BUILD_DATE
LABEL BUILD_VERSION=$BUILD_VERSION

RUN mkdir /marquepage
WORKDIR /marquepage

COPY ./package-lock.json .
COPY ./package.json .
COPY ./src ./src

RUN npm ci

ENTRYPOINT ["npm", "run", "start"]