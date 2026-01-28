# Docker - Guia de Containerização

## Estrutura de Arquivos Docker

```
├── Dockerfile              # Build de produção (multi-stage)
├── Dockerfile.dev          # Build de desenvolvimento
├── docker-compose.yml      # Orquestração produção
├── docker-compose.dev.yml  # Orquestração desenvolvimento
├── nginx.conf              # Configuração do Nginx
├── .dockerignore           # Arquivos ignorados no build
└── .env.example            # Exemplo de variáveis
```

## Comandos Rápidos

### Produção

```bash
# Build da imagem
docker build -t pet-manager:latest .

# Executar container
docker run -d -p 8080:80 --name pet-manager pet-manager:latest

# Ou usar docker-compose
docker-compose up -d

# Ver logs
docker-compose logs -f

# Parar
docker-compose down
```

### Desenvolvimento (com Hot-Reload)

```bash
# Iniciar ambiente de desenvolvimento
docker-compose -f docker-compose.dev.yml up -d

# Ver logs
docker-compose -f docker-compose.dev.yml logs -f

# Reconstruir após mudanças em dependências
docker-compose -f docker-compose.dev.yml up -d --build

# Parar
docker-compose -f docker-compose.dev.yml down
```

## Build Multi-Stage

O Dockerfile usa build multi-stage para otimização:

1. **Stage 1 (build)**: Compila a aplicação React/Vite
2. **Stage 2 (production)**: Serve arquivos estáticos com Nginx

**Benefícios:**
- Imagem final menor (~50MB vs ~1GB)
- Apenas arquivos de produção
- Melhor segurança
- Deploy mais rápido

## Tamanho das Imagens

```
REPOSITORY          TAG       SIZE
pet-manager         latest    ~50MB   (Nginx + build)
pet-manager         dev       ~800MB  (Node + deps + código)
```

## Portas

- **Produção**: `http://localhost:8080`
- **Desenvolvimento**: `http://localhost:5173`
- **Health Check**: `http://localhost:8080/health`

## Segurança

O Nginx está configurado com:
- Headers de segurança (X-Frame-Options, CSP, etc.)
- Compressão Gzip
- Cache de assets estáticos
- Health check endpoint

## Publicar no Docker Hub

```bash
# Login
docker login

# Tag
docker tag pet-manager:latest seuusuario/pet-manager:latest
docker tag pet-manager:latest seuusuario/pet-manager:1.0.0

# Push
docker push seuusuario/pet-manager:latest
docker push seuusuario/pet-manager:1.0.0
```

## Deploy em Cloud

### AWS ECS / Fargate
```bash
# Push para ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.us-east-1.amazonaws.com
docker tag pet-manager:latest <account-id>.dkr.ecr.us-east-1.amazonaws.com/pet-manager:latest
docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/pet-manager:latest
```

### Google Cloud Run
```bash
# Build e deploy
gcloud builds submit --tag gcr.io/PROJECT-ID/pet-manager
gcloud run deploy --image gcr.io/PROJECT-ID/pet-manager --platform managed
```

### Azure Container Instances
```bash
# Build e push para ACR
az acr build --registry myregistry --image pet-manager:latest .
az container create --resource-group myResourceGroup --name pet-manager --image myregistry.azurecr.io/pet-manager:latest --dns-name-label pet-manager --ports 80
```

## Troubleshooting

### Container não inicia
```bash
# Ver logs
docker logs pet-manager

# Verificar processos
docker exec -it pet-manager ps aux
```

### Build falha
```bash
# Build com verbose
docker build --no-cache --progress=plain -t pet-manager:latest .

# Verificar camadas
docker history pet-manager:latest
```

### Testar localmente
```bash
# Entrar no container
docker exec -it pet-manager sh

# Verificar arquivos
ls -la /usr/share/nginx/html
```

## CI/CD

Exemplo de GitHub Actions:

```yaml
# .github/workflows/docker.yml
name: Docker Build

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Build Docker image
        run: docker build -t pet-manager:latest .
      
      - name: Run tests
        run: docker run pet-manager:latest npm test
```

## Variáveis de Ambiente

Crie arquivo `.env` baseado em `.env.example`:

```bash
cp .env.example .env
```

Edite conforme necessário.

## Limpeza

```bash
# Remover containers parados
docker container prune

# Remover imagens não utilizadas
docker image prune -a

# Limpar tudo (cuidado!)
docker system prune -a --volumes
```
