FROM node:20-alpine

WORKDIR /app

# Copy package.json and package-lock.json
COPY src/api/package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY src/api/ ./

# Expose the port
EXPOSE 3000

# Start the server
CMD ["node", "index.js"] 