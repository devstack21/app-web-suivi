FROM nginx:latest

RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/conf.d/
COPY ./certificate.pem /etc/ssl/
COPY ./privatekey.pem /etc/ssl/
