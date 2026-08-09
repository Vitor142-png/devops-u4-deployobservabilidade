# Guia passo a passo — partes que só você pode fazer

Todo o código, Dockerfile, testes e workflow já estão prontos na pasta do projeto. Estas etapas dependem das suas contas pessoais, então precisam ser feitas por você. Siga na ordem.

## 1. Criar o repositório no GitHub

1. Acesse https://github.com/new
2. Nome do repositório: `devops-u4-deployobservabilidade`
3. Visibilidade: **Público**
4. Não marque "Add a README" (já temos um).
5. Crie o repositório e copie a URL (ex: `https://github.com/SEU_USUARIO/devops-u4-deployobservabilidade.git`).

No terminal, dentro da pasta do projeto:

```bash
git init
git add .
git commit -m "Primeiro commit: estrutura do projeto, API, testes e pipeline CI/CD"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/devops-u4-deployobservabilidade.git
git push -u origin main
```

Depois faça um segundo commit (ex: um pequeno ajuste no README ou em um endpoint) e dê push novamente, para validar que o pipeline dispara em cada push, conforme pedido na atividade.

Edite o `README.md` e troque `SEU_USUARIO` pelo seu usuário real do GitHub (para o badge funcionar).

## 2. Criar conta no Docker Hub

1. Acesse https://hub.docker.com e crie uma conta gratuita.
2. Vá em **Account Settings > Security > New Access Token**, dê um nome (ex: `github-actions`) e copie o token gerado (só aparece uma vez).
3. No GitHub, vá em **Settings > Secrets and variables > Actions > New repository secret** e crie:
   - `DOCKERHUB_USERNAME` = seu usuário do Docker Hub
   - `DOCKERHUB_TOKEN` = o token gerado

## 3. Criar o serviço no Render

1. Acesse https://render.com e crie uma conta (pode usar login com GitHub).
2. Clique em **New > Web Service**.
3. Conecte o repositório `devops-u4-deployobservabilidade`.
4. Configuração:
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** Free
5. Após criar, copie a URL pública gerada (ex: `https://devops-u4-deployobservabilidade.onrender.com`).
6. Em **Settings > Deploy Hook**, copie a URL do deploy hook.
7. No GitHub, adicione os secrets:
   - `RENDER_DEPLOY_HOOK_URL` = a URL do deploy hook
   - `PRODUCTION_URL` = a URL pública do serviço (sem barra no final)

> Alternativa: se preferir usar a imagem publicada no Docker Hub em vez do build nativo do Render, crie o Web Service escolhendo "Existing Image" e aponte para `SEU_USUARIO/devops-u4-deployobservabilidade:latest`. Nesse caso não precisa do deploy hook — basta habilitar auto-deploy da imagem mais recente.

## 4. Validar o pipeline completo

Dê um push para `main` e acompanhe em **Actions** no GitHub: o job `ci` deve passar (lint + testes), depois o job `cd` builda a imagem, publica no Docker Hub, dispara o deploy no Render e valida o `/health` em produção. Tire prints da execução (tela verde do workflow).

Acesse a URL pública e confirme que `/`, `/health` e `/api/produtos` respondem. Faça uma pequena alteração (ex: mude o texto da mensagem de boas-vindas), dê push e confirme que a URL atualiza sozinha em poucos minutos — isso comprova o deploy automático.

## 5. Configurar monitoramento e alerta (Better Uptime)

1. Acesse https://betteruptime.com e crie uma conta gratuita.
2. Vá em **Monitors > Create monitor**.
3. Tipo: **HTTP(s)**, URL: a URL pública do `/health` (ex: `https://devops-u4-deployobservabilidade.onrender.com/health`).
4. Frequência de checagem: 3 minutos (plano free).
5. Em **Alert policy**, configure alerta por e-mail para quando o monitor detectar `down` (falha de resposta ou status diferente de 200).
6. Salve e aguarde a primeira checagem ficar "Up" (verde).

Para testar o alerta: acesse `https://SUA_URL/api/simular-erro` (retorna 500 propositalmente) ou pause o serviço no Render por alguns minutos e observe se o Better Uptime dispara o e-mail. Tire print do dashboard "Up" e do e-mail/alerta recebido.

## 6. Reunir evidências

Para o documento `Deploy_U4` e a pasta do Google Drive, você vai precisar de:

- Print do workflow do GitHub Actions rodando com sucesso (CI e CD verdes).
- Print da aplicação respondendo na URL pública.
- Print do dashboard do Better Uptime com o monitor "Up".
- Print (ou log copiado) de um evento de alerta disparado.
- Link do repositório GitHub.
- Link da aplicação publicada.

## 7. Organizar no Google Drive

1. Crie a pasta `U4_Deploy_Observabilidade` no seu Google Drive.
2. Coloque nela: os prints/vídeo, o `Deploy_U4.docx` preenchido com as evidências, e um arquivo de texto com o link do repositório.
3. Gere um link de compartilhamento com permissão de visualização.

## 8. Envio final

Monte um `.zip` contendo `Deploy_U4.docx`/`.pdf`, os prints e o link do repositório, e envie na plataforma do curso.
