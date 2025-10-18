FROM node:24.4-alpine3.21

WORKDIR /var/www/app

COPY ./ ./

RUN npm install -g pnpm
RUN npm install -g turbo
RUN npm install -g pm2
RUN pnpm install:all
RUN pnpm build:parallel
EXPOSE 3001 3002 3003 3003 3004 3005
CMD ["pm2-runtime", "start","ecosystem.config.js"]
