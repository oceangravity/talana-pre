# develop stage
FROM node:12.14.0 as develop-stage
WORKDIR /home/app/talana
RUN apt-get -y update \
  && apt-get install -y git
COPY package.json /home/app/talana/package.json
RUN yarn config set unsafe-perm true
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/app/talana/node_modules/.bin
RUN yarn
COPY . .
EXPOSE 8100
CMD ["./start.sh"]

# build stage
FROM develop-stage as build-stage
RUN npm run build

# production stage
FROM nginx:1.15.7-alpine as production-stage
COPY --from=build-stage /home/app/talana/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

