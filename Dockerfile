# Stage 1: Build the app
FROM node:22-alpine AS builder

WORKDIR /app

# Add build arguments
ARG DB_URL
ARG PUBLIC_CACHE_TIME=60
ENV DB_URL=${DB_URL}
ENV PUBLIC_CACHE_TIME=${PUBLIC_CACHE_TIME}

COPY package*.json .
COPY svelte.config.js .
COPY vite.config.ts .
COPY tsconfig.json .

# Install dependencies (including devDependencies for building)
RUN npm install

COPY . .

# Build the app for production
RUN npm run sync && npm run build  # Add sync command

# Stage 2: Run the app
FROM node:22-alpine

WORKDIR /app

# Set runtime environment variables
ENV DB_URL=${DB_URL}
ENV PUBLIC_CACHE_TIME=${PUBLIC_CACHE_TIME}

# Copy only production dependencies and built files
COPY --from=builder /app/package*.json .
COPY --from=builder /app/build ./build

# Install ONLY production dependencies
RUN npm install --omit=dev

EXPOSE 5173

# Start the production server (for @sveltejs/adapter-node)
CMD ["node", "build"]