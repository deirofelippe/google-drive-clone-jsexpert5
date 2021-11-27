FROM node:16-alpine3.14
WORKDIR /home/node/app
USER node
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD [ "npm", "start" ]