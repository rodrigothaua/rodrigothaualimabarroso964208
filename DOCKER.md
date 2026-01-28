# Pet Manager - Guia de Containerização

## Arquivos Docker Criados

```
├── Dockerfile                   # Build multi-stage otimizado
├── Dockerfile.dev              # Build para desenvolvimento
├── docker-compose.yml          # Orquestração produção
├── docker-compose.dev.yml      # Orquestração desenvolvimento
├── nginx.conf                  # Configuração Nginx
├── .dockerignore               # Exclusões do build
├── .env.production             # Variáveis de produção
├── scripts/
│   ├── build-docker.sh        # Script Linux/Mac
│   └── build-docker.bat       # Script Windows
└── README.Docker.md           # Documentação completa
```

## Comandos Rápidos (NPM Scripts)

### Produção
```bash
# Build da imagem
npm run docker:build

# Executar container
npm run docker:prod

# Ver logs
npm run docker:logs

# Parar e remover
npm run docker:down
```

### Desenvolvimento (com Hot-Reload)
```bash
# Iniciar ambiente dev
npm run docker:dev

# Ver logs
docker-compose -f docker-compose.dev.yml logs -f

# Parar
docker-compose -f docker-compose.dev.yml down
```

## Início Rápido

### Opção 1: Docker Compose (Recomendado)
```bash
# Produção
docker-compose up -d

# Acesse: http://localhost:3000
```

### Opção 2: Docker direto
```bash
# Build
docker build -t pet-manager:latest .

# Run
docker run -d -p 3000:80 --name pet-manager pet-manager:latest

# Acesse: http://localhost:3000
```

### Opção 3: Scripts prontos
```bash
# Windows
scripts\build-docker.bat

# Linux/Mac
chmod +x scripts/build-docker.sh
./scripts/build-docker.sh
```

## Recursos Implementados

### Build Multi-Stage
- **Stage 1**: Compilação com Node.js
- **Stage 2**: Servir com Nginx
- **Resultado**: Imagem ~50MB (vs ~1GB sem otimização)

### Segurança
- Executa como usuário não-root
- Headers de segurança configurados
- Dependências isoladas
- Minimal Alpine Linux

### Performance
- Compressão Gzip habilitada
- Cache de assets estáticos (1 ano)
- Build otimizado de produção
- Layers otimizadas

### Monitoramento
- Health checks configurados
- Endpoints: `/health`, `/healthz`, `/ready`
- Auto-restart em falhas
- Logs estruturados

### Desenvolvimento
- Hot-reload funcional
- Volumes montados
- Ambiente isolado
- Porta padrão 5173

## Tamanho das Imagens

```
IMAGEM                  TAMANHO    USO
pet-manager:latest      ~50MB      Produção
pet-manager:dev         ~800MB     Desenvolvimento
node:20-alpine          ~120MB     Base build
nginx:alpine            ~40MB      Base produção
```

## Endpoints

| Ambiente | URL | Porta |
|----------|-----|-------|
| Produção | http://localhost:3000 | 3000 |
| Desenvolvimento | http://localhost:5173 | 5173 |
| Health Check | http://localhost:3000/health | 3000 |

## Configurações

### Limites de Recursos
```yaml
CPU: 0.5 cores (max), 0.25 cores (reservado)
Memória: 256MB (max), 128MB (reservado)
```

### Variáveis de Ambiente
Edite `.env.production` para configurar:
```env
NODE_ENV=production
VITE_API_URL=https://pet-manager-api.geia.vip
```

## Troubleshooting

### Container não inicia
```bash
docker logs pet-manager-frontend
docker inspect pet-manager-frontend
```

### Build falha
```bash
docker build --no-cache --progress=plain -t pet-manager:latest .
```

### Testar dentro do container
```bash
docker exec -it pet-manager-frontend sh
ls -la /usr/share/nginx/html
```

### Verificar health
```bash
curl http://localhost:3000/health
curl http://localhost:3000/healthz
curl http://localhost:3000/ready
```

## Deploy em Produção

### Docker Hub
```bash
docker tag pet-manager:latest seuusuario/pet-manager:1.0.0
docker push seuusuario/pet-manager:1.0.0
```

### AWS ECR
```bash
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account>.dkr.ecr.us-east-1.amazonaws.com
docker tag pet-manager:latest <account>.dkr.ecr.us-east-1.amazonaws.com/pet-manager:latest
docker push <account>.dkr.ecr.us-east-1.amazonaws.com/pet-manager:latest
```

### Google Cloud Run
```bash
gcloud builds submit --tag gcr.io/PROJECT-ID/pet-manager
gcloud run deploy --image gcr.io/PROJECT-ID/pet-manager
```

## Limpeza

```bash
# Parar e remover containers
npm run docker:down

# Remover imagens não utilizadas
docker image prune -a

# Limpar tudo
docker system prune -a --volumes
```

## Mais Informações

Consulte [README.Docker.md](README.Docker.md) para documentação completa.
