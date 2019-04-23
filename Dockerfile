FROM node:8
WORKDIR /usr/src/app

COPY package*.json ./ 

RUN npm install
COPY . . 

EXPOSE "9192:9192"
CMD [ "npm" , "start" ]

