# devops-u4-deployobservabilidade

![CI/CD](https://github.com/Vitor142-png/devops-u4-deployobservabilidade/actions/workflows/ci-cd.yml/badge.svg)

API back-end simples em Node.js/Express, criada para a atividade avaliativa Hands-On da Unidade 4 (Deploy e Manutenção de Back-end) do curso de Análise e Desenvolvimento de Sistemas.

## Sobre o projeto

A aplicação expõe uma API REST simples com dados fixos em memória, usada como base para demonstrar um pipeline completo de CI/CD, deploy em nuvem e observabilidade.

### Endpoints

| Método | Rota | Descrição |
|---|---|---|
| GET | `/` | Mensagem de boas-vindas e lista de endpoints |
| GET | `/health` | Health check (usado pelo monitoramento) |
| GET | `/api/produtos` | Lista todos os produtos |
| GET | `/api/produtos/:id` | Retorna um produto específico |
| GET | `/api/simular-erro` | Retorna 500 propositalmente (para testar alertas) |

## Rodando localmente

```bash
npm install
npm start
# API disponível em http://localhost:3000
```

## Testes

```bash
npm test
```

Executa os testes funcionais com Jest + Supertest e gera relatório de cobertura em `coverage/`.

## Docker

```bash
docker build -t devops-u4-deployobservabilidade .
docker run -p 3000:3000 devops-u4-deployobservabilidade
```

## Pipeline CI/CD (GitHub Actions)

O workflow em `.github/workflows/ci-cd.yml` roda em todo push/PR para `main`:

1. **CI** — instala dependências, roda lint (`eslint`) e testes automatizados.
2. **CD** (somente em push para `main` e após o CI passar) — builda e publica a imagem Docker no Docker Hub, dispara o deploy no Render via deploy hook e valida o endpoint `/health` em produção.

### Secrets necessários no repositório GitHub

Configurar em `Settings > Secrets and variables > Actions`:

- `DOCKERHUB_USERNAME` — usuário do Docker Hub
- `DOCKERHUB_TOKEN` — access token do Docker Hub
- `RENDER_DEPLOY_HOOK_URL` — URL do deploy hook do serviço no Render
- `PRODUCTION_URL` — URL pública da aplicação (ex: `https://devops-u4.onrender.com`)

Veja o passo a passo completo em [`docs/GUIA_DEPLOY.md`](docs/GUIA_DEPLOY.md).

### Repositório

https://github.com/Vitor142-png/devops-u4-deployobservabilidade

## Deploy

- **URL de produção:** _(preencher após o deploy)_

## Observabilidade

Monitoramento de disponibilidade configurado via Better Uptime (ou equivalente), com alerta automático em caso de erro 5xx ou tempo de resposta elevado. Detalhes e evidências em [`docs/Deploy_U4.docx`](docs/Deploy_U4.docx).

## Licença

MIT
