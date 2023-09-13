# Dockerfile
FROM oven/bun:latest

# Create app directory
WORKDIR /app

# Install app dependencies
# COPY package*.json ./
COPY bun.lockb ./
RUN bun install

# Bundle app source
COPY . .

# Expose port and start app
EXPOSE 3000
# CMD [ "npm", "run", "prod" ]
CMD [ "bun", "run", "dev" ]
