# Use an official Node.js runtime as a base image
FROM node:14 as build

# Set the working directory
WORKDIR /app/react

# Copy package.json and package-lock.json to the working directory
COPY ./package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Use Nginx to serve the built React app
FROM nginx:alpine

# Copy the built app from the previous stage to the Nginx public directory
COPY --from=build /app/react/build /usr/share/nginx/html

# Expose port 3000
EXPOSE 3000
