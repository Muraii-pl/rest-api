#build stage
FROM node:18.12.0 AS build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

#prod stage
FROM node:18.12.0

ARG NODE_ENV=production
ARG POSTGRES_H0ST='db'
ARG POSTGRES_PORT=5432
ARG POSTGRES_USER='postgres'
ARG POSTGRES_PASSWORD='mysecretpassword'
ARG POSTGRES_DATABASE='postgres'
ARG JWT_KEY="0$[@f9gie$tHDC+xh%fJVPmYIEmy;pXwOW&0jKf;NiPS&}}`1&'Z_ReDitZHJy2"
ARG JWT_EXPIRATION_TIME=9999


ENV NODE_ENV=${NODE_ENV}
ENV POSTGRES_H0ST=${POSTGRES_H0ST}
ENV POSTGRES_PORT=${POSTGRES_PORT}
ENV POSTGRES_USER=${POSTGRES_PORT}
ENV POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
ENV POSTGRES_DATABASE=${POSTGRES_DATABASE}
ENV JWT_KEY=${JWT_KEY}
ENV JWT_EXPIRATION_TIME=${JWT_EXPIRATION_TIME}

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/dist ./dist

COPY package*.json ./

RUN npm install --only=production

RUN rm package*.json

EXPOSE 3000

CMD [ "npm", "run", "start" ]

