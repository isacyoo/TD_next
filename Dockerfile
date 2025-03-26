# Development Stage
FROM node:23-alpine AS development

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 3000


CMD ["npm", "run", "dev"]

# Builder Stage
FROM node:23-alpine AS builder

RUN apk --no-cache add curl

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

# Production Stage 

FROM node:23-alpine AS production

WORKDIR /app

# Copy the built artifacts from the builder stage
COPY --from=builder /app ./

# Set the environment variables (if needed)
ENV NODE_ENV=production

EXPOSE 3000

CMD ["npm", "run", "start"]