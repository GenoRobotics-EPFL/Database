# Use Node.js 16-alpine as the base image
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /app/interface

# Copy package.json and to the working directory
COPY package.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application files to the working directory
COPY . .

# Expose port 3000
EXPOSE 3000

# Start the app (dev)
CMD ["npm", "run", "dev"]

# Start the app (prof)
# CMD ["npm", "run", "build"]