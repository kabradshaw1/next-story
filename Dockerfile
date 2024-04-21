# Define the base image
FROM node:20.11.1-alpine3.18

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npm prune --prduction 

EXPOSE 3000

CMD ["npm", "run", "start"]