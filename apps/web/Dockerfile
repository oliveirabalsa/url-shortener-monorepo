# Build the React app
FROM node:22-alpine as build

WORKDIR /usr/src/app

COPY package.json ./
RUN npm install

COPY . .

RUN npm run build

# Serve the build using Nginx
FROM nginx:alpine

# Copy built React app to Nginx folder
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
