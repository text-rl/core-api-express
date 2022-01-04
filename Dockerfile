#Debian GNU/Linux 11 (bullseye)
FROM node:17

WORKDIR /usr
RUN mkdir monitoring && mkdir src/app && \
    wget https://github.com/prometheus/node_exporter/releases/download/v1.3.1/node_exporter-1.3.1.linux-amd64.tar.gz -P ./monitoring && \
    tar xvfz ./monitoring/node_exporter-1.3.1.linux-amd64.tar.gz -C ./monitoring

COPY package*.json ./src/app/


RUN npm --prefix ./src/app install

# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . ./src/app/
RUN chmod 777 -R ./src/app/docker-run.sh

EXPOSE 8080 9100
CMD [ "./src/app/docker-run.sh" ]
