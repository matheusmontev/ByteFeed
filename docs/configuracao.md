# Guia de Configuração e Execução

Siga estes passos para rodar o projeto localmente.

## Requisitos
- **JDK 21** ou superior.
- **Node.js 18** ou superior.
- **Docker** e **Docker Compose** (opcional, para o banco).
- **Maven** (opcional, pode usar `./mvnw`).

## Backend

1. Entre na pasta `backend`:
   ```bash
   cd backend
   ```
2. Suba o banco de dados via Docker:
   ```bash
   docker-compose up -d
   ```
3. Rode a aplicação:
   ```bash
   ./mvnw spring-boot:run
   ```
   A API estará disponível em `http://localhost:8080`.

## Frontend

1. Entre na pasta `bytefeed-app`:
   ```bash
   cd bytefeed-app
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configure o arquivo `.env`:
   Crie um arquivo `.env` na raiz do frontend com:
   ```env
   VITE_API_URL=http://localhost:8080/api
   ```
4. Rode o modo desenvolvimento:
   ```bash
   npm run dev
   ```
   O app estará disponível em `http://localhost:5173`.

[Voltar ao README principal](../README.md)
