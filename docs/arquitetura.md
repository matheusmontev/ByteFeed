# Arquitetura do Projeto ByteFeed

O ByteFeed é uma rede social moderna construída com uma arquitetura desacoplada, separando claramente as responsabilidades entre o cliente (frontend) e o servidor (backend).

## Visão Geral

O sistema é dividido em dois grandes módulos:
1. **ByteFeed Backend**: Uma API RESTful robusta.
2. **ByteFeed App**: Uma aplicação Single Page Application (SPA) reativa.

## Tecnologias Utilizadas

### Backend
- **Java 21**: Linguagem principal.
- **Spring Boot 4**: Framework para facilitar a configuração e o desenvolvimento.
- **Spring Security & JWT**: Gerenciamento de autenticação e autorização.
- **Spring Data JPA**: Abstração de acesso ao banco de dados.
- **PostgreSQL**: Banco de dados relacional.
- **Liquibase**: Gerenciamento de versionamento de banco de dados (migrações).
- **Docker Compose**: Orquestração de serviços locais (Banco de dados).

### Frontend
- **React 19**: Biblioteca de UI.
- **Vite**: Build tool extremamente rápido.
- **Tailwind CSS 4**: Framework CSS utilitário para design responsivo.
- **React Router Dom**: Gerenciamento de rotas.
- **Context API**: Gerenciamento de estado global (Autenticação e Posts).

## Estrutura de Pastas

```text
ByteFeed/
├── backend/            # Código fonte do servidor Java/Spring
│   ├── src/            # Implementação da API
│   ├── compose.yaml    # Configuração Docker para banco local
│   └── pom.xml         # Dependências Maven
├── bytefeed-app/       # Código fonte da interface React
│   ├── src/            # Componentes, Páginas e Contextos
│   ├── public/         # Ativos estáticos
│   └── package.json    # Dependências Node.js
└── docs/               # Documentação detalhada (esta pasta)
```

[Voltar ao README principal](../README.md)
