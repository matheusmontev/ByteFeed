# Modelagem de Dados

O ByteFeed utiliza um banco de dados relacional (PostgreSQL) com as seguintes entidades principais:

## Entidades

### 1. User (Usuários)
- `id`: UUID ou Long (PK)
- `username`: Nome de usuário único
- `email`: E-mail único
- `password`: Senha criptografada (BCrypt)
- `bio`: Pequena biografia
- `profile_picture`: URL da imagem

### 2. Post (Publicações)
- `id`: PK
- `content`: Texto do post
- `image_url`: URL opcional para imagem
- `created_at`: Timestamp de criação
- `user_id`: FK para a tabela de usuários

## Migrações (Liquibase)

As migrações estão localizadas em `backend/src/main/resources/db/changelog`. Elas garantem que a estrutura do banco seja recriada de forma consistente em qualquer ambiente.

### Fluxo de Migração:
1. `db.changelog-master.yaml`: Arquivo principal que inclui outros changelogs.
2. `001-create-users.yaml`: Criação da tabela de usuários.
3. `002-create-posts.yaml`: Criação da tabela de posts e relacionamentos.

[Voltar ao README principal](../README.md)
