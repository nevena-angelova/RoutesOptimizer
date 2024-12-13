# Step 1: Build the Angular app
FROM node:latest AS build

# Set the working directory inside the container
WORKDIR /app

# Install dependencies
COPY package.json ./
RUN npm install

# Copy the Angular app source code into the container
COPY . .
RUN npm install

# Build the Angular app
RUN npm run build

# Debugging step: list the contents of /app/dist to confirm the build output
RUN ls -la /app/dist

# Step 2: Serve the app with NGINX
FROM nginx:alpine

# Copy the build output to NGINX's public directory
COPY --from=build /app/dist/RoutesOptimizer.Client/browser /usr/share/nginx/html

# Expose the default Nginx port
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
