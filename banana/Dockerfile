FROM rnkoaa/node-alpine:9
MAINTAINER Richard Agyei <https://github.com/rnkoaa> <richard.agyei@outlook.com>

ENV NODE_ENV=${NODE_ENV:-dev}

RUN mkdir -p /var/www/app

COPY package.json /var/www/app

RUN rm -rf ${RM_DIRS} /node-${VERSION}* /usr/share/man /tmp/* /var/cache/apk/* \
    /root/.node-gyp /root/.gnupg

WORKDIR /var/www/app

RUN npm install -g pm2 \
 && npm install --only=prod \
 && npm prune --production

COPY dist/ /var/www/app

CMD ["node", "server.js"]