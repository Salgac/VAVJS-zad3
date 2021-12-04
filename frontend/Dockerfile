FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=8080

EXPOSE 8080

CMD ["export", "NODE_OPTIONS=--openssl-legacy-provider"]

CMD ["npm", "run", "serve"]