FROM node:20-alpine
WORKDIR /app
COPY package.json ./
COPY src ./src
COPY scripts ./scripts
COPY test ./test
RUN npm test
EXPOSE 3000
CMD ["npm", "start"]
