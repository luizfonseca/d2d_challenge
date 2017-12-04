# Using LTS
FROM node:carbon


# Create app directory
RUN mkdir -p /src/api
WORKDIR /src/api



COPY package*.json /src/api



COPY . /src/api

RUN npm install

EXPOSE 3000

CMD ["node", "server.js"]
