#!/bin/bash

# Script para build otimizado do Docker
set -e

echo "Iniciando build da imagem Docker..."

# Variáveis
IMAGE_NAME="pet-manager"
VERSION=${1:-"latest"}

echo "Building image: ${IMAGE_NAME}:${VERSION}"

# Build com cache
docker build \
  --build-arg BUILDKIT_INLINE_CACHE=1 \
  --tag ${IMAGE_NAME}:${VERSION} \
  --tag ${IMAGE_NAME}:latest \
  .

echo "Build concluído!"

# Mostrar tamanho da imagem
echo ""
echo "Tamanho da imagem:"
docker images ${IMAGE_NAME}:${VERSION}

echo ""
echo "Para executar:"
echo "   docker run -d -p 3000:80 ${IMAGE_NAME}:${VERSION}"
echo ""
echo "Ou use docker-compose:"
echo "   docker-compose up -d"
