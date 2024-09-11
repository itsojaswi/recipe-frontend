# Stage 1: Build Stage
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /home/node/app

# Copy only the necessary files for installation
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the application
RUN npm run build

# Stage 2: Production Stage
FROM nginx:alpine

# Copy the custom mime types file
COPY custom_mime.types /etc/nginx/conf.d/custom_mime.types

# Copy the custom nginx configuration file with a different name
COPY nginx.conf /etc/nginx/conf.d/custom.conf

# Copy built files from the build stage
COPY --from=builder /home/node/app/dist /usr/share/nginx/html

# Expose the application on port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
