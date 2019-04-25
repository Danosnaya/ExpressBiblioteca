FROM node:8
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .
VOLUME /usr/src/app

EXPOSE "9192:9192"
CMD [ "npm" , "start" ]

