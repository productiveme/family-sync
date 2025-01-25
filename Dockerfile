# Use Node.js LTS as base image
FROM node:18-slim

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the client
RUN npm run build

# Expose ports for Vite and GraphQL server
EXPOSE 3001
EXPOSE 3002

# Create startup script
RUN echo '#!/bin/sh\n\
npm run dev:server & \
npm run dev:client\n\
wait' > /app/start.sh && chmod +x /app/start.sh

# Start both servers
CMD ["/app/start.sh"]
