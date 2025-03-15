FROM node:18
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
COPY .env.docker .env
EXPOSE 8080
CMD node ./data/insertEmployees.js & node server.js