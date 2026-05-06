# Documentação do Backend

O backend do ByteFeed é responsável pela lógica de negócios, persistência de dados e segurança.

## Camadas do Sistema

A aplicação segue o padrão de camadas recomendado pelo Spring:

1. **Web (Controllers)**: Localizado em `com.gustavoanjos.ByteFeedBackend.web`. Contém os endpoints REST.
2. **Service**: Localizado em `com.gustavoanjos.ByteFeedBackend.service`. Contém a lógica de negócio refinada.
3. **Domain (Entities/DTOs)**: Localizado em `com.gustavoanjos.ByteFeedBackend.domain`. Define os modelos de dados e objetos de transferência.
4. **Repository**: Localizado em `com.gustavoanjos.ByteFeedBackend.repository`. Interfaces Spring Data para comunicação com o PostgreSQL.
5. **Config**: Localizado em `com.gustavoanjos.ByteFeedBackend.config`. Configurações de segurança, CORS e beans do Spring.

## Segurança e Autenticação

A segurança é implementada usando **Spring Security** com **JSON Web Tokens (JWT)**:
- **Registro**: Permite a criação de novos usuários.
- **Login**: Autentica o usuário e retorna um token JWT.
- **Proteção de Rotas**: Endpoints sensíveis exigem o cabeçalho `Authorization: Bearer <token>`.

## Principais Endpoints (Exemplos)

- `POST /api/auth/register`: Cadastro de usuário.
- `POST /api/auth/login`: Autenticação.
- `GET /api/posts`: Listagem de posts.
- `POST /api/posts`: Criação de novo conteúdo (exige auth).
- `DELETE /api/posts/{id}`: Remoção de posts (apenas pelo autor).

## Banco de Dados

- **PostgreSQL**: Utilizado para persistência.
- **Liquibase**: Garante que o esquema do banco de dados esteja sempre sincronizado entre os desenvolvedores. As migrações ficam em `src/main/resources/db/changelog`.

[Voltar ao README principal](../README.md)
