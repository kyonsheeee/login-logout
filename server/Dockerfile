FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY ./ ./

RUN npm run build

COPY .server/pakage*.json ./server/
RUN cd server && npm install

CMD ["sh", "-c", "cd server && node index.js & npm start"]
