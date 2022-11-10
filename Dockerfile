FROM node:16.13
WORKDIR /usr/src/url-shortener-api-backend
COPY ./package*.json ./
COPY ./yarn.lock ./
RUN yarn install
RUN chmod -77 /usr/src/url-shortener-api-backend/node_modules
ENV LANG=en_US.UTF-8 \
  LC_ALL=en_US.UTF-8