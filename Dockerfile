FROM node:alpine
WORKDIR /app/
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN npm run compile-protobuf:dist
RUN npx tsc
RUN find . -name "*.ts" -type f -delete
RUN find ./dist -name "*.js"
CMD ["node", "./dist/index.js"]
