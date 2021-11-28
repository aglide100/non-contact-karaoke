# nginx/Dockerfile
FROM nginx

RUN rm -rf /etc/nginx/sites-enabled/default

RUN rm -f /etc/nginx/conf.d/default.conf

COPY ./nginx.conf /etc/nginx/nginx.conf

RUN  mkdir -p /etc/nginx/conf.d

RUN mkdir -p /etc/nginx/sites-available && mkdir -p /etc/nginx/sites-enabled

COPY proxy.conf.template .

COPY entrypoint.sh .
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]

RUN ln -s /etc/nginx/sites-available/proxy.conf /etc/nginx/sites-enabled/proxy.conf

WORKDIR /etc/nginx 
CMD nginx -g "daemon off;"