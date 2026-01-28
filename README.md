# Pet Manager MT - Sistema de Registro de Pets e Tutores

## Dados do Candidato

- **Nome:** Rodrigo Thauã Lima Barroso
- **CPF:** 964.208.982-34
- **Vaga:** Engenheiro da Computação Sênior
- **ID do Repositório:** rodrigothaualimabarroso964208
- **Data:** Janeiro 2026

## Descrição do Projeto

Sistema web para gerenciamento de registro público de Pets e Tutores desenvolvido para o Estado de Mato Grosso. O projeto consome a API pública disponibilizada e implementa todas as funcionalidades CRUD necessárias com interface moderna e responsiva.

## Arquitetura do Sistema

```
src/
├── components/              # Componentes Reutilizáveis (UI Layer)
│   ├── Button.tsx          # Componente de botão com variantes
│   ├── Card.tsx            # Componente de card clicável
│   ├── ConfirmDialog.tsx   # Modal de confirmação
│   ├── Input.tsx           # Input com label e validação
│   ├── Loading.tsx         # Indicador de carregamento
│   ├── Navbar.tsx          # Barra de navegação
│   ├── Pagination.tsx      # Componente de paginação
│   ├── PrivateRoute.tsx    # HOC para proteção de rotas
│   └── Toast.tsx           # Notificações temporárias
│
├── pages/                  # Páginas da Aplicação (View Layer)
│   ├── LoginPage.tsx       # Autenticação de usuário
│   ├── PetsListPage.tsx    # Listagem paginada de pets
│   ├── PetDetailPage.tsx   # Detalhes completos do pet
│   ├── PetFormPage.tsx     # Cadastro/edição de pet
│   ├── TutoresListPage.tsx # Listagem paginada de tutores
│   ├── TutorDetailPage.tsx # Detalhes completos do tutor
│   └── TutorFormPage.tsx   # Cadastro/edição de tutor
│
├── services/               # Camada de Serviços (Facade Pattern)
│   ├── api.ts             # Cliente HTTP com interceptors
│   ├── authService.ts     # Serviços de autenticação
│   ├── petService.ts      # Serviços CRUD de pets
│   └── tutorService.ts    # Serviços CRUD de tutores
│
├── store/                  # Gerenciamento de Estado (Redux Toolkit)
│   ├── index.ts           # Configuração da store
│   ├── hooks.ts           # Hooks tipados (useAppDispatch, useAppSelector)
│   ├── authSlice.ts       # Estado de autenticação
│   ├── petSlice.ts        # Estado de pets e paginação
│   └── tutorSlice.ts      # Estado de tutores e paginação
│
├── hooks/                  # Custom Hooks
│   └── useToast.ts        # Hook para gerenciar toasts
│
├── types/                  # Definições TypeScript
│   └── index.ts           # Interfaces e tipos compartilhados
│
├── test/                   # Testes Automatizados
│   ├── setup.ts           # Configuração do Vitest
│   ├── components/        # Testes de componentes
│   ├── services/          # Testes de serviços
│   ├── store/             # Testes de Redux slices
│   └── hooks/             # Testes de hooks
│
├── App.tsx                 # Componente raiz com rotas
└── main.tsx               # Entry point da aplicaçãoync (page, size, nome) => {
    const response = await apiClient.get('/v1/pets', { params });
    return response.data;
  }
};

// Camada de Estado (Redux)
export const fetchPets = createAsyncThunk(
  'pets/fetchAll',
  async (params) => await petService.getAll(params)
);

// Camada de Apresentação
const pets = useAppSelector(state => state.pets.pets);
```

#### 3. Component-Based Architecture
- **Componentes Reutilizáveis**: Button, Input, Card, Loading, etc.
- **Composição**: Componentes complexos compostos por componentes simples
- **Props Tipadas**: TypeScript garante type safety
- **Separation of Concerns**: Componentes de UI vs Páginas de negócio

#### 4. Lazy Loading e Code Splitting
- **React.lazy**: Carregamento sob demanda de páginas
- **Suspense Boundaries**: Estados de carregamento durante lazy load
- **Otimização de Bundle**: Redução do tamanho do bundle inicial

## Arquitetura de Pastas

### Estrutura de Pastas

```
src/
├── components/          # Componentes reutilizáveis
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Input.tsx
│   ├── Loading.tsx
│   ├── Navbar.tsx
│   ├── Pagination.tsx
│   └── PrivateRoute.tsx
├── pages/              # Páginas da aplicação
│   ├── LoginPage.tsx
│   ├── PetsListPage.tsx
│   ├── PetDetailPage.tsx
│   ├── PetFormPage.tsx
│   ├── TutoresListPage.tsx
│   ├── TutorDetailPage.tsx
│   └── TutorFormPage.tsx
├── services/           # Serviços de API
│   ├── api.ts
│   ├── authService.ts
│   ├── petService.ts
│   └── tutorService.ts
├── store/              # Redux Store
│   ├── index.ts
│   ├── hooks.ts
│   ├── authSlice.ts
│   ├── petSlice.ts
│   └── tutorSlice.ts
├── types/              # TypeScript interfaces
#### Frontend
- **React 19.2.0** - Biblioteca UI com Server Components
- **TypeScript 5.9** - Superset JavaScript com tipagem estática
- **Redux Toolkit 2.11** - Gerenciamento de estado com menos boilerplate
- **React Router DOM 7.13** - Roteamento declarativo com lazy loading
- **Axios 1.13** - Cliente HTTP com interceptors e retry
- **Tailwind CSS 3.4** - Framework CSS utility-first
- **Vite 7.2** - Build tool moderna com HMR rápido

#### Testes
- **Vitest 4.0** - Framework de testes unitários (compatível com Vite)
- **Testing Library 16.3** - Utilitários para testar componentes React
- **Jest DOM 6.9** - Matchers customizados para assertions DOM

#### DevOps
- **Docker** - Containerização com build multi-stage
- **Nginx Alpine** - Servidor web leve para produção
- **ESLint 9** - Linter para qualidade de código
- **PostCSS + Autoprefixer** - Processamento CSS

### Fluxo de Dados

```
┌──────────────┐
│  UI Component│
└──────┬───────┘
       │ dispatch(action)
       ▼
┌──────────────┐
│ Redux Store  │
└──────┬───────┘
       │ async thunk
       ▼
┌──────────────┐
│   Service    │ (Facade)
└──────┬───────┘
       │ HTTP request
       ▼
┌──────────────┐
│   API Client │ (Axios + Interceptors)
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  Backend API │
└──────────────┘
```
[x] Requisição de dados em tempo real com Axios
- [x] Layout responsivo para mobile, tablet e desktop
- [x] Tailwind CSS configurado e otimizado
- [x] Lazy Loading de rotas com React.lazy
- [x] Paginação de 10 itens por página
- [x] TypeScript em 100% do código
- [x] Arquitetura em camadas bem definida
- [x] Componentização e reusabilidade
- [x] 83 testes unitários (100% de aprovação)

### Requisitos Funcionais

#### 1. Tela Inicial - Listagem de Pets
- [x] GET /v1/pets com paginação
- [x] Cards visuais com foto, nome, raça e idade
- [x] Navegação de páginas (anterior/próxima)
- [x] Busca por nome com filtro em tempo real
- [x] Loading states e tratamento de erros
- [x] Responsivo em todos os breakpoints

#### 2. Tela de Detalhamento do Pet
- [x] Navegação por clique no card
- [x] GET /v1/pets/{id} para dados completos
- [x] Exibição de tutor vinculado (quando existir)
- [x] Nome do pet em destaque no cabeçalho
- [x] Botões para editar e excluir
- [x] Modal de confirmação para exclusão

#### 3. Tela de Cadastro/Edição de Pet
- [x] POST /v1/pets para novo cadastro
- [x] PUT /v1/pets/{id} para atualização
- [x] Campos: nome, raça, idade
- [x] Validação de campos obrigatórios
- [x] Upload de foto (POST /v1/pets/{id}/fotos)
- [x] Preview de imagem
- [x] Feedback de sucesso/erro

#### 4. Tela de Cadastro/Edição de Tutor
- [x] POST /v1/tutores para cadastro
- [x] PUT /v1/tutores/{id} para edição
- [x] Campos: nome, telefone, endereço, email, CPF
- [x] Máscaras para telefone e CPF
- [x] Validação de email e CPF
- [x] Upload de foto (POST /v1/tutores/{id}/fotos)
- [x] Vinculação de pets (POST /v1/tutores/{id}/pets/{petId})
- [x] Remoção de vínculo (DELETE /v1/tutores/{id}/pets/{petId})
- [x] Listagem de pets vinculados

#### 5. Autenticação
- [x] POST /autenticacao/login
- [x] Refresh token automático (PUT /autenticacao/refresh)
- [x] Interceptor Axios para injetar token
- [x] Proteção de rotas com PrivateRoute
- [x] Redirecionamento para login quando não autenticado
- [x] Logout com limpeza de tokens do localStorage
- [x] Persistência de sessão

### Requisitos Técnicos Avançados

#### a) Containerização
- [x] Dockerfile multi-stage (build + production)
- [x] Imagem final otimizada (~50MB)
- [x] Nginx configurado com Gzip e cache
- [x] Health checks (/health, /healthz, /ready)
- [x] Docker Compose para orquestração
- **Node.js 20+** e npm (para desenvolvimento local)
- **Docker e Docker Compose** (para execução em container)
- **Git** (para clonar o repositório)

### Opção 1: Desenvolvimento Local (Recomendado para desenvolvimento)

```bash
# 1. Clonar o repositório
git clone <repository-url>
cd rodrigothaualimabarroso964208

# 2. Instalar dependências
npm install

# 3. Executar em modo desenvolvimento (com hot-reload)
npm run dev

# 4. Acessar a aplicação
# URL: http://localhost:5173
```

**Scripts disponíveis:**
```bash
npm run dev          # Inicia servidor de desenvolvimento
npm run build        # Build de produção
npm run preview      # Preview do build de produção
npm run lint         # Executar linter
npm test             # Executar testes unitários
npm test -- --ui     # Executar testes com interface visual
npm test -- --coverage  # Executar testes com relatório de cobertura
```

### Opção 2: Docker Compose (Recomendado para produção)

```bash
# 1. Build e iniciar container
docker-compose up -d

# 2. Verificar logs
docker-compose logs -f

# 3. Acessar aplicação
# URL: http://localhost:3000

# 4. Verificar health
# URL: http://localhost:3000/health

# 5. Parar container
docker-compose down
```

### Opção 3: Docker Manual

```bash
# Build da imagem
docker build -t pet-manager:latest .

# Executar container
docker run -d -p 3000:80 --name pet-manager pet-manager:latest

# Ver logs
docker logs -f pet-manager

# Parar e remover
docker stop pet-manager && docker rm pet-manager
```

### Opção 4: Ambiente de Desenvolvimento com Docker

```bash
# Iniciar ambiente dev com hot-reload em Docker
docker-compose -f docker-compose.dev.yml up -d

# Acessar em http://localhost:5173
```

## Como Testar

### Executar Testes Unitários

```bash
# Executar todos os testes
npm test

# Executar com watch mode
npm test -- --watch

# Executar com interface UI
npm test -- --ui

# Gerar relatório de cobertura
npm test -- --coverage

# Executar testes específicos
npm test -- Button.test.tsx
```

### Resultados Esperados:

**Endpoint de Login:** `POST https://pet-manager-api.geia.vip/autenticacao/login`

### Fluxo de Autenticação

1. Usuário envia credenciais para `/autenticacao/login`
2. API retorna `access_token` e `refresh_token`
3. Tokens são armazenados no `localStorage`
4. Axios interceptor injeta `Authorization: Bearer {token}` em todas as requisições
5. Quando token expira (401), interceptor chama automaticamente `/autenticacao/refresh`
6. Novo token é obtido e requisição original é reenviada
7. Se refresh falhar, usuário é redirecionado para login

### Proteção de Rotas

Todas as rotas (exceto `/login`) são protegidas pelo componente `PrivateRoute`:
- Verifica se há token no localStorage
- Redireciona para `/login` se não autenticado
- Permite acesso se autenticado

## Estrutura de Testes

### Organização

```
src/
├── components/__tests__/     # 41 testes
│   ├── Button.test.tsx       # 8 testes
│   ├── Card.test.tsx         # 5 testes
│   ├── ConfirmDialog.test.tsx # 5 testes
│   ├── Input.test.tsx        # 9 testes
│   ├── Loading.test.tsx      # 2 testes
│   ├── Pagination.test.tsx   # 6 testes
│   └── Toast.test.tsx        # 6 testes
│
├── hooks/__tests__/          # 5 testes
│   └── useToast.test.ts      # 5 testes
│
├── services/__tests__/       # 15 testes
│   ├── authService.test.ts   # 4 testes
│   ├── petService.test.ts    # 6 testes
│   └── tutorService.test.ts  # 5 testes
│
└── Build Multi-Stage Docker

O Dockerfile implementa build em duas etapas para otimização:

**Etapa 1 - Build (Node.js 20 Alpine):**
- Instala dependências de produção
- Compila TypeScript e bundling com Vite
- Otimiza assets (minificação, tree-shaking)

**Etapa 2 - Production (Nginx Alpine):**
- Copia apenas arquivos compilados (dist/)
- Imagem final: ~50MB (vs ~1GB sem otimização)
- Nginx configurado para SPA routing
- Usuário não-root para segurança

### Recursos de Produção

**Performance:**
- Compressão Gzip para todos os assets
- Cache de 1 ano para arquivos estáticos (JS, CSS, imagens)
- Lazy loading de rotas
- Code splitting automático

**Segurança:**
**Design System:**
- Tailwind CSS utility-first
- Paleta de cores consistente
- Tipografia hierárquica
- Espaçamento baseado em escala

**Responsividade:**
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Grid adaptativo
- Navegação mobile com menu hamburguer

**UX:**
- Feedback visual imediato (loading, sucesso, erro)
- Toasts para notificações não-obstrutivas
- Modais de confirmação para ações destrutivas
- Estados vazios com call-to-action
- Skeleton screens durante carregamento

**Acessibilidade:**
- Navegação por teclado
- Labels em inputs
- Contraste adequado
- Estados de foco visíveis

## Histórico depoint `/ready` para readiness probes
- Logs estruturados

### Configuração de Ambiente

**API Base URL:**
Configurado em `src/services/api.ts`:
```typescript
const API_BASE_URL = 'https://pet-manager-api.geia.vip';
```

Para alterar:
1. Editar antes do build, ou
2. Usar variáveis de ambiente no build:
```bash
VITE_API_URL=https://outra-api.com npm run build
```

### Deploy em Cloud

**Docker Hub:**
```bash
docker tag pet-manager:latest seuusuario/pet-manager:1.0.0
docker push seuusuario/pet-manager:1.0.0
```

**AWS ECS/Fargate:**
```bash
aws ecr get-login-password | docker login --username AWS --password-stdin <account>.dkr.ecr.us-east-1.amazonaws.com
docker tag pet-manager:latest <account>.dkr.ecr.us-east-1.amazonaws.com/pet-manager:latest
docker push <account>.dkr.ecr.us-east-1.amazonaws.com/pet-manager:latest
```

## Interface do Usuário
1. **Instalar dependências:**
```bash
npm install
```

2. **Executar em modo desenvolvimento:**
```bash
npm run dev
```

3. **Acessar a aplicação:**
Commits organizados de forma incremental seguindo boas práticas:

1. **Setup inicial**: Configuração Vite, TypeScript, Tailwind
2. **Estrutura base**: Criação de pastas e arquivos iniciais
3. **Services**: Implementação de API client e services
4. **Redux**: Setup de store e slices
5. **Componentes**: Desenvolvimento de UI components
6. **Páginas**: Criação de todas as páginas
7. **Autenticação**: Implementação de login e proteção de rotas
8. **Testes**: 83 testes unitários
9. **Docker**: Containerização com multi-stage build
**Testes:**
- Aumentar cobertura de testes para > 80%
- Testes de integração com Mock Service Worker
- Testes E2E com Playwright
- Visual regression testing

**Features:**
- Internacionalização (i18n) - pt-BR e en-US
- PWA - Service Worker, offline-first
- Dark mode
- Filtros avançados (múltiplos critérios)
- Ordenação customizável
- Exportação de dados (PDF, Excel)
- Busca full-text
- Histórico de ações (audit log)

**Performance:**
- Virtual scrolling para listas grandes
- Infinite scroll como alternativa à paginação
- Otimização de imagens (WebP, lazy loading)
- Service Worker para cache
- Prefetch de dados

**DevOps:**
- CI/CD com GitHub Actions
- Deploy automático
- Monitoramento com Sentry
- Analytics
- Logs centralizados

## Documentação Adicional

- [DOCKER.md](DOCKER.md) - Guia completo de containerização
- [README.Docker.md](README.Docker.md) - Documentação detalhada Docker

## Licença

Projeto desenvolvido como parte do processo seletivo.

## Autor

**Rodrigo Thauã Lima Barroso**
- CPF: 964.208.982-34
- Vaga: Engenheiro da Computação Sênior
- Janeiro 2026**
```
http://localhost:3000
```

3. **Verificar health:**
```
http://localhost:3000/health
```

### Build manual do Docker

```bash
# Build da imagem
docker build -t pet-manager .

# Executar container
docker run -p 3000:80 pet-manager
```

## 🔐 Autenticação

A aplicação requer autenticação para acessar as funcionalidades. Use as credenciais fornecidas pela API para fazer login.

O sistema implementa:
- Refresh token automático quando o token expira
- Redirecionamento para login quando não autenticado
- Proteção de todas as rotas privadas

## 🧪 Testes

Testes implementados:
- Componente Button (renderização, variantes, loading)
- Auth Slice (estado inicial, logout)

Para adicionar mais testes:
```bash
npm test -- --watch
```

## 📦 Deploy

### Produção com Docker

A aplicação está empacotada em container Docker multi-stage:

1. **Build stage:** Instala dependências e compila a aplicação
2. **Production stage:** Serve arquivos estáticos com Nginx

Features de produção:
- Compressão Gzip
- Cache de assets estáticos
- Health checks
- Configuração otimizada do Nginx

### Variáveis de Ambiente

A API base está configurada em `src/services/api.ts`:
```typescript
const API_BASE_URL = 'https://pet-manager-api.geia.vip';
```

Para alterar em produção, modifique antes do build ou use substituição em tempo de build.

## 🎨 Interface

- Design limpo e moderno com Tailwind CSS
- Responsivo para mobile, tablet e desktop
- Feedback visual de loading e erros
- Navegação intuitiva
- Cards visuais para listagens
- Modais para ações específicas

## 📝 Commits

Os commits foram organizados de forma incremental e com mensagens descritivas seguindo boas práticas:

- Configuração inicial do projeto
- Implementação de serviços e Redux
- Desenvolvimento de componentes
- Criação de páginas
- Testes e documentação
- Containerização

## 🔄 Melhorias Futuras

Possíveis incrementos:
- Mais testes unitários e de integração
- Testes E2E com Playwright/Cypress
- Internacionalização (i18n)
- PWA capabilities
- Notificações toast
- Filtros avançados
- Ordenação de listagens
- Exportação de relatórios
- Dark mode

## 📄 Licença

Projeto desenvolvido como parte de processo seletivo.

## 👨‍💻 Autor

Rodrigo Thaualima Barroso
