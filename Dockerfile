# Using LTS
FROM node:carbon


# Create app directory
WORKDIR /api



COPY package*.json ./



RUN npm install



COPY . .


EXPOSE 3000

CMD ['npm', 'start']
