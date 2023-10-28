FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm ci --ignore-scripts

COPY . .

RUN npm run build

EXPOSE $PORT

CMD ["npm", "start"]
