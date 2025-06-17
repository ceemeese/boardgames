# Etapa 1: Construcción con Node + Parcel
FROM node:18-alpine AS build

# Crear directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json para instalar dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar todo el código fuente
COPY . .

#Puerto de Parcel
EXPOSE 1234

# Comando por defecto
CMD ["npm", "start"]
