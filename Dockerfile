# Escolha uma imagem base com o Node.js instalado.
FROM node:14-alpine

# Diretório de trabalho dentro do contêiner.
WORKDIR /app

# Copiar o arquivo package.json e package-lock.json (ou yarn.lock se estiver usando Yarn) para o contêiner.
COPY package*.json ./

# Instalar as dependências do projeto.
RUN npm install

# Copiar todo o código-fonte para o contêiner.
COPY . .

# Construir o projeto Vue.js para produção.
RUN npm run build

# Etapa opcional para usar o servidor HTTP Node.js para servir o aplicativo.
# Caso contrário, você pode usar um servidor HTTP separado, como o Nginx, para servir o build.

# Instalar o servidor http-server globalmente (se você não o tiver instalado ainda).
RUN npm install -g http-server

# Expor a porta 8080 (a porta usada pelo Vue.js por padrão).
EXPOSE 8080

# Comando para executar o servidor HTTP no contêiner.
CMD ["http-server", "dist"]
