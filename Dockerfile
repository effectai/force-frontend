# Dockerfile
FROM node:14-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm ci

# Bundle app source
COPY . .

# Expose port and start app
EXPOSE 3000
CMD [ "npm", "run", "dev" ]
