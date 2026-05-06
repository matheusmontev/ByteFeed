# Documentação do Frontend

A interface do ByteFeed foi projetada para ser rápida, responsiva e visualmente atraente.

## Estrutura de Código

- **src/pages**: Contém as visualizações principais (Login, Feed, Profile, etc).
- **src/components**: Componentes reutilizáveis como botões, modais, cards de post e barras de navegação.
- **src/context**: Gerenciamento de estado global:
    - `AuthContext`: Armazena informações do usuário logado e o token JWT.
    - `PostContext`: Gerencia a lista de posts e ações de criação/exclusão.

## Estilização

Utilizamos **Tailwind CSS 4** para toda a estilização:
- Design responsivo (Mobile-first).
- Dark mode suporte (planejado/em implementação).
- Componentes personalizados via classes utilitárias.

## Integração com a API

A comunicação é feita via `fetch` ou `axios` (verificar implementação atual).
- A URL da API é configurada via variáveis de ambiente (`.env`).
- Os tokens JWT são armazenados no `localStorage` para persistência da sessão.

## Rotas Principais

- `/`: Landing page / Login.
- `/feed`: Visualização principal com posts de todos os usuários.
- `/profile`: Detalhes do perfil do usuário logado.

[Voltar ao README principal](../README.md)
