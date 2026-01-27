# Pet Manager MT - Sistema de Registro de Pets e Tutores

## 📋 Dados do Candidato

- **Nome:** Rodrigo Thaualima Barroso
- **ID:** rodrigothaualimabarroso964208
- **Vaga:** Desenvolvedor Full Stack
- **Data:** Janeiro 2026

## 🎯 Descrição do Projeto

Sistema web para gerenciamento de registro público de Pets e Tutores desenvolvido para o Estado de Mato Grosso. O projeto consome a API pública disponibilizada e implementa todas as funcionalidades CRUD necessárias com interface moderna e responsiva.

## 🏗️ Arquitetura

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
│   └── index.ts
├── test/               # Testes unitários
│   ├── setup.ts
│   ├── Button.test.tsx
│   └── authSlice.test.ts
├── App.tsx
└── main.tsx
```

### Stack Tecnológica

- **React 19** - Framework UI
- **TypeScript** - Tipagem estática
- **Redux Toolkit** - Gerenciamento de estado global
- **React Router v6** - Roteamento com lazy loading
- **Axios** - Cliente HTTP com interceptors
- **Tailwind CSS** - Framework CSS utility-first
- **Vite** - Build tool e dev server
- **Vitest** - Framework de testes
- **Docker** - Containerização
- **Nginx** - Servidor web de produção

### Padrões Implementados

#### 1. **Redux para Gerenciamento de Estado**
- Store centralizada com slices separados (auth, pets, tutores)
- Actions assíncronas com createAsyncThunk
- Hooks tipados (useAppDispatch, useAppSelector)

#### 2. **Serviços em Camadas (Facade Pattern)**
- Camada de serviços abstrai comunicação com API
- Interceptors para autenticação e refresh token
- Tratamento centralizado de erros

#### 3. **Componentização**
- Componentes reutilizáveis (Button, Input, Card, etc.)
- Componentes de página especializados
- Props tipadas com TypeScript

#### 4. **Lazy Loading**
- Code splitting por rota
- Carregamento sob demanda de páginas
- Suspense boundaries para loading states

## ✅ Requisitos Implementados

### Requisitos Gerais
- ✅ Requisição de dados em tempo real com Axios
- ✅ Layout responsivo
- ✅ Tailwind CSS
- ✅ Lazy Loading de rotas
- ✅ Paginação (10 itens por página)
- ✅ TypeScript
- ✅ Boas práticas de organização e componentização
- ✅ Testes unitários básicos

### Requisitos Específicos

#### 1. Tela Inicial - Listagem de Pets ✅
- GET /v1/pets implementado
- Cards com foto, nome, raça e idade
- Paginação de 10 por página
- Busca por nome para filtrar

#### 2. Tela de Detalhamento do Pet ✅
- Navegação por clique no card
- GET /v1/pets/{id}
- Exibição de dados do tutor quando existir
- Nome do pet em destaque

#### 3. Tela de Cadastro/Edição de Pet ✅
- Formulário para novo pet (POST /v1/pets)
- Edição de pet existente (PUT /v1/pets/{id})
- Campos: nome, raça, idade
- Upload de foto (POST /v1/pets/{id}/fotos)

#### 4. Tela de Cadastro/Edição de Tutor ✅
- Cadastro de tutores (POST /v1/tutores)
- Atualização (PUT /v1/tutores/{id})
- Campos: nome, telefone, endereço, email, CPF
- Máscaras para telefone e CPF
- Upload de foto (POST /v1/tutores/{id}/fotos)
- Vinculação de pets (POST /v1/tutores/{id}/pets/{petId})
- Remoção de vínculo (DELETE /v1/tutores/{id}/pets/{petId})

#### 5. Autenticação ✅
- Login (POST /autenticacao/login)
- Refresh token automático (PUT /autenticacao/refresh)
- Proteção de rotas privadas
- Logout e limpeza de tokens

### Requisitos Adicionais

#### a) Health Checks ✅
- Endpoint /health no Nginx
- Healthcheck no Dockerfile
- Liveness/Readiness no Docker Compose

#### b) Testes Unitários ✅
- Testes de componentes com Vitest
- Testes de Redux slices
- Setup com @testing-library

#### c) Gerenciamento de Estado Redux ✅
- Redux Toolkit implementado
- Slices para auth, pets e tutores
- Actions assíncronas com thunks

## 🚀 Como Executar

### Pré-requisitos

- Node.js 20+ e npm
- Docker e Docker Compose (opcional)

### Desenvolvimento Local

1. **Instalar dependências:**
```bash
npm install
```

2. **Executar em modo desenvolvimento:**
```bash
npm run dev
```

3. **Acessar a aplicação:**
```
http://localhost:5173
```

### Executar Testes

```bash
npm test
```

### Build de Produção

```bash
npm run build
npm run preview
```

### Docker (Recomendado)

1. **Build e execução com Docker Compose:**
```bash
docker-compose up --build
```

2. **Acessar a aplicação:**
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
