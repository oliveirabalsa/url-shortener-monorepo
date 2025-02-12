# Use a full Node.js image that includes standard modules
FROM node:22-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package.json first and install dependencies
COPY package.json  ./
RUN npm install

# Copy the rest of the application
COPY . .

# Ensure path module is available
RUN npm install --save-dev @types/node

# Build the project
RUN npm run build

# Serve built files
CMD ["npm", "run", "preview"]
