# Stage 1: Build the app
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json .
COPY svelte.config.js .
COPY vite.config.ts .

# Install dependencies (including devDependencies for building)
RUN npm install

COPY . .

# Build the app for production
RUN npm run build

# Stage 2: Run the app
FROM node:22-alpine

WORKDIR /app

# Copy only production dependencies and built files
COPY --from=builder /app/package*.json .
COPY --from=builder /app/build ./build

# Install ONLY production dependencies
RUN npm install --omit=dev

EXPOSE 5173

# Start the production server (for @sveltejs/adapter-node)
CMD ["node", "build"]