FROM nginx

WORKDIR /usr/share/nginx/html

# Nginx Config
RUN rm -rf /etc/nginx/conf.d

COPY conf /etc/nginx

COPY build/ .

EXPOSE 80

# Start Nginx server
CMD [ "nginx", "-g","daemon off;"]


