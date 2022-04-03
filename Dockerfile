FROM node:latest

COPY ./ /home/user/frontend
WORKDIR /home/user/frontend
RUN yarn install
RUN yarn build
RUN apt-get update
RUN apt-get -y install nginx
RUN cp ./misc/default_nginx /etc/nginx/sites-available/default
RUN rm /var/www/html/*
RUN cp -r build/* /var/www/html/
EXPOSE 9090

CMD ["/bin/bash", "./misc/start.sh"]
