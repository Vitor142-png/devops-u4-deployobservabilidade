const express = require('express');

const app = express();

app.use(express.json());

// Dados fixos em memória, suficientes para os fins didáticos da atividade
const produtos = [
  { id: 1, nome: 'Notebook', preco: 3500.0, categoria: 'Eletrônicos' },
  { id: 2, nome: 'Mouse sem fio', preco: 89.9, categoria: 'Acessórios' },
  { id: 3, nome: 'Teclado mecânico', preco: 349.5, categoria: 'Acessórios' },
];

let startedAt = new Date();

// Rota raiz - informações básicas da API
app.get('/', (req, res) => {
  res.status(200).json({
    mensagem: 'API da atividade Unidade 4 - Deploy e Observabilidade',
    autor: 'Vitor Hugu',
    endpoints: ['/', '/health', '/api/produtos', '/api/produtos/:id'],
  });
});

// Rota de health check - usada pelo monitoramento (uptime, alertas)
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    uptimeSegundos: process.uptime(),
    iniciadoEm: startedAt.toISOString(),
    timestamp: new Date().toISOString(),
  });
});

// Lista todos os produtos
app.get('/api/produtos', (req, res) => {
  res.status(200).json(produtos);
});

// Retorna um produto específico
app.get('/api/produtos/:id', (req, res) => {
  const id = Number(req.params.id);
  const produto = produtos.find((p) => p.id === id);

  if (!produto) {
    return res.status(404).json({ erro: 'Produto não encontrado' });
  }

  return res.status(200).json(produto);
});

// Rota utilizada apenas para validar alertas de erro 5xx no monitoramento
app.get('/api/simular-erro', (req, res) => {
  res.status(500).json({ erro: 'Erro simulado para teste de observabilidade' });
});

// Middleware simples de 404 para rotas não mapeadas
app.use((req, res) => {
  res.status(404).json({ erro: 'Rota não encontrada' });
});

module.exports = app;
