FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

ENV EXPO_DEVTOOLS_LISTEN_IP=0.0.0.0

EXPOSE 8081

CMD ["npx", "expo", "start", "--tunnel"]
