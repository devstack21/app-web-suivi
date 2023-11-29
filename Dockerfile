# Use an official Node runtime as a parent image
FROM node:14

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Use Nginx to serve the built React app
FROM nginx:latest

# Copy the built app from the previous stage
COPY --from=0 /app/build /usr/share/nginx/html

# Copy Nginx configuration file
#COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# CMD is not necessary as the default CMD of the Nginx image is to start Nginx
