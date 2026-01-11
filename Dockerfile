# BUILD STAGE
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx prisma generate
RUN npm run build

# PRODUCTION STAGE  
FROM node:20-alpine AS production
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package*.json ./

# FIXED: Migrate → Generate → Seed → Start
CMD sh -c "npx prisma migrate deploy && \
           npx prisma generate && \
           npx prisma db seed && \
           npm run start:prod"

EXPOSE 3000
