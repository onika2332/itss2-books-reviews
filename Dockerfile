FROM node as build

WORKDIR /app

COPY package.json .
ARG NODE_ENV

ENV NODE_ENV ${NODE_ENV}

RUN npm install --force

COPY . .

RUN npm run build

FROM nginx

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=build /app/build .

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]

