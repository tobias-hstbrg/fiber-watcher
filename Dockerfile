# Use official Node.js LTS image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files and install deps
COPY package*.json ./
RUN npm install

# Copy all source files
COPY . .

# If you use TypeScript, build the project
#RUN npm run build

# Set environment variable TZ for Berlin timezone (optional, mostly for logging inside container)
ENV TZ=Europe/Berlin

# Run the built JavaScript file (adjust path if needed) with build
#CMD ["node", "dist/main.js"]
# without building just running
CMD ["npm", "start"]
