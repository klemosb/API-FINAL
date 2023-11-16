FROM node:14

# Diretório de trabalho na imagem
WORKDIR /app

COPY . .

RUN npm install

EXPOSE 8080

CMD ["node", "server.js"]
