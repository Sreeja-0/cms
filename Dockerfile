# BUILD STAGE
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
RUN npm install @nestjs/cli --save-dev
COPY . .
RUN npx prisma@6.19.1 generate
RUN npm run build

# PRODUCTION STAGE  
FROM node:20-alpine AS stage-1
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package*.json ./  

# 🔥 MIGRATE at RUNTIME + START APP
CMD sh -c "npx prisma@6.19.1 migrate deploy && npm run start:prod"

EXPOSE 3000
