# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory to /app/react
WORKDIR /app/react

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the current directory contents into the container at /app/react
COPY . .

# Expose port 3000 to the outside world
EXPOSE 3000

# Define environment variable
ENV REACT_APP_API_URL http://api:8000

# Build the app
RUN npm run build

# Command to run the app
CMD ["npm", "start"]

