# Base image
FROM node:14-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the application code
COPY . .

# Expose the port the app runs on
EXPOSE 4000

ENV NODE_ENV=production

# Command to run the application
CMD ["npm", "run", "start"]






