# Build stage
FROM node:20-alpine AS build

# Adicionar labels para metadados
LABEL maintainer="Pet Manager Team"
LABEL version="1.0.0"
LABEL description="Pet Manager Frontend Application"

WORKDIR /app

# Instalar dependências do sistema (se necessário)
RUN apk add --no-cache git

# Copiar package files
COPY package*.json ./

# Instalar dependências (otimizado)
RUN npm ci --only=production --ignore-scripts \
    && npm cache clean --force

# Copiar código fonte
COPY . .

# Build da aplicação com otimizações
ENV NODE_ENV=production
RUN npm run build

# Production stage
FROM nginx:alpine

# Adicionar labels
LABEL maintainer="Pet Manager Team"
LABEL version="1.0.0"

# Criar usuário não-root para segurança
RUN addgroup -g 101 -S nginx \
    && adduser -S -D -H -u 101 -h /var/cache/nginx -s /sbin/nologin -G nginx -g nginx nginx

# Copiar build para nginx
COPY --from=build --chown=nginx:nginx /app/dist /usr/share/nginx/html

# Copiar configuração customizada do nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Garantir permissões corretas
RUN chown -R nginx:nginx /usr/share/nginx/html \
    && chmod -R 755 /usr/share/nginx/html \
    && chown -R nginx:nginx /var/cache/nginx \
    && chown -R nginx:nginx /var/log/nginx \
    && touch /var/run/nginx.pid \
    && chown -R nginx:nginx /var/run/nginx.pid

# Expor porta
EXPOSE 80

# Healthcheck - Liveness probe
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/healthz || exit 1

# Mudar para usuário não-root
USER nginx

CMD ["nginx", "-g", "daemon off;"]
