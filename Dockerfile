FROM node:12

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm ci --only=production

# Bundle app source
COPY app ./app

EXPOSE 8080

CMD [ "npm", "start" ]