FROM node:16.14-alpine 
# Create app directory
WORKDIR /server

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production
RUN npm install pm2 -g

# Bundle app source
COPY . .

EXPOSE 8080
CMD ["node", "server.js"]
