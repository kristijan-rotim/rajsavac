FROM node:20-alpine
WORKDIR /app
COPY package*.json .
RUN npm ci --omit=dev  # Install production dependencies only
COPY . .
RUN npm run build      # Build the SvelteKit app
CMD ["node", "build"]