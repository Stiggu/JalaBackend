FROM node:16.15.0-alpine

USER node
ENV NODE_ENV=development

RUN mkdir -p /home/node/app
WORKDIR /home/node/app

COPY package.json ./
COPY tsconfig.json ./
COPY src ./src
RUN ls -a
RUN npm install
RUN npm run build

ENV HOST=0.0.0.0 PORT=3000
EXPOSE ${PORT}

CMD ["node", "dist"]
