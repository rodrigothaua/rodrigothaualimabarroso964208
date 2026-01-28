@echo off
REM Script para build otimizado do Docker no Windows

echo Iniciando build da imagem Docker...

set IMAGE_NAME=pet-manager
set VERSION=%1
if "%VERSION%"=="" set VERSION=latest

echo Building image: %IMAGE_NAME%:%VERSION%

docker build ^
  --build-arg BUILDKIT_INLINE_CACHE=1 ^
  --tag %IMAGE_NAME%:%VERSION% ^
  --tag %IMAGE_NAME%:latest ^
  .

if %ERRORLEVEL% neq 0 (
    echo Erro no build!
    exit /b %ERRORLEVEL%
)

echo Build concluído!
echo.
echo Tamanho da imagem:
docker images %IMAGE_NAME%:%VERSION%

echo.
echo Para executar:
echo    docker run -d -p 3000:80 %IMAGE_NAME%:%VERSION%
echo.
echo Ou use docker-compose:
echo    docker-compose up -d
