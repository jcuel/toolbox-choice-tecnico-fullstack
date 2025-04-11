# Stage 1: Build the app
FROM node:16 AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Stage 2: Serve the app
FROM node:16
WORKDIR /app

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/server.js /app/
COPY --from=builder /app/package*.json /app/
RUN npm install --omit=dev
EXPOSE 8080
CMD ["node", "server.js"]