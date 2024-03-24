# Base image for React application
FROM node:lts-alpine AS build

WORKDIR /app

# Copy React application code
COPY package*.json ./
RUN npm install

COPY . .

# Build the React application
RUN npm run build

# Image for serving the React app
FROM nginx:stable-alpine

WORKDIR /usr/share/nginx/html

# Copy the built React app from the build stage
COPY --from=build /app/build .

EXPOSE 80

# Start the nginx server
CMD ["nginx", "-g", "daemon off;"]
