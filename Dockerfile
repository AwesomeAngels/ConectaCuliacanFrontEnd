#Build stage
FROM node:22-alpine AS build
WORKDIR /app
COPY . .
RUN npm install --frozen-lockfile
RUN npm run build

#Production stage
FROM nginx:1.27.5-alpine AS production
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80 443
#Modify nginx production
CMD ["nginx", "-g", "daemon off;"]
