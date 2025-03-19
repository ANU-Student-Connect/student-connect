# Use an official Node.js image as the base image
FROM node:18-alpine 

# Set working directory
RUN mkdir -p /server
WORKDIR /server

# Copy package.json and install dependencies
COPY package*.json /server/
RUN npm install --production

# Copy the rest of the application
COPY . /server/

# Run Dev
CMD ["npm", "run", "start"]

EXPOSE 9000