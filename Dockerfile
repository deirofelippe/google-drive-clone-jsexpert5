FROM node:16-alpine3.14
WORKDIR /app
COPY package.json package-lock.json ./
RUN yarn install
COPY . .
CMD [ "yarn", "start" ]