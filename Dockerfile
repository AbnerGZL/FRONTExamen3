# Usar una imagen oficial de Node.js como base
FROM node:20-alpine AS builder

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos de dependencias
COPY package.json package-lock.json* ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Construir la aplicación Next.js
RUN npm run build

# Producción: usar una imagen más ligera
FROM node:20-alpine AS runner

WORKDIR /app

# Copiar solo los archivos necesarios desde el builder
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Exponer el puerto
EXPOSE 3000

# Comando por defecto para iniciar la app
CMD ["npm", "start"]