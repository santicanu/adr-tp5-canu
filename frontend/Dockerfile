# Dockerfile frontend

FROM node:20 AS build
WORKDIR /app

# Copiamos dependencias
COPY package*.json ./
RUN npm install

COPY . .

# Variable para la URL del backend
ARG VITE_BASE_URL
ENV VITE_BASE_URL=$VITE_BASE_URL

# Build de producción
RUN npm run build

FROM node:20
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/dist /app/dist

EXPOSE 5173
CMD ["serve", "-s", "dist", "-l", "5173"]
