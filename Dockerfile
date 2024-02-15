# Stage 1: Build

FROM node:16-alpine AS build

WORKDIR /app

COPY package*.json ./
COPY .env .
RUN npm install

COPY . .

# Stage 2: Release

FROM build

WORKDIR /app

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/server.js ./server.js
COPY --from=build /app/.env ./env

EXPOSE 5000

CMD ["node", "server.js"]