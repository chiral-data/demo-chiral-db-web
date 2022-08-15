# build stage
FROM node:14.17 as build
ARG APP_HOME=/home/node/app
WORKDIR ${APP_HOME}

COPY . ${APP_HOME}
RUN yarn install
RUN yarn build

# deploy stage
FROM nginx:alpine
ARG APP_HOME=/home/node/app
COPY --from=build ${APP_HOME}/build /var/www
COPY ./nginx /etc/nginx/conf.d/

WORKDIR /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
