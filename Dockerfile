FROM node:16-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . .

RUN npm run build

#2. Serve
FROM nginx:1.21.3-alpine
COPY --from=builder /app/build /usr/share/nginx/html
# COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]