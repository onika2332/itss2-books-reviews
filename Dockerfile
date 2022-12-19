FROM node as build

WORKDIR /app


COPY package.json .

RUN npm install --force

COPY . .

RUN npm run build


FROM nginx

WORKDIR /usr/share/nginx/html

# Nginx Config
RUN rm -rf /etc/nginx/conf.d

COPY conf /etc/nginx

COPY --from=build /app/build .

EXPOSE 80

# Copy .env file and shell script to container
#WORKDIR /usr/share/nginx/html
#COPY ./env.sh .
#COPY .env .
#
## Make our shell script executable
#RUN chmod +x env.sh

# Start Nginx server
CMD [ "nginx", "-g","daemon off;"]


