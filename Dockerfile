FROM node:16-alpine
WORKDIR /app
COPY package.json .
COPY .env .
RUN npm install
COPY . .
EXPOSE 5000
CMD ["node" , "server.js"]
