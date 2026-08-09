const request = require('supertest');
const app = require('../src/app');

describe('API - testes funcionais', () => {
  test('GET / deve retornar 200 e mensagem de boas-vindas', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('mensagem');
  });

  test('GET /health deve retornar status ok', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  test('GET /api/produtos deve retornar lista de produtos', async () => {
    const res = await request(app).get('/api/produtos');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test('GET /api/produtos/:id deve retornar um produto existente', async () => {
    const res = await request(app).get('/api/produtos/1');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('nome');
  });

  test('GET /api/produtos/:id deve retornar 404 para produto inexistente', async () => {
    const res = await request(app).get('/api/produtos/999');
    expect(res.statusCode).toBe(404);
  });

  test('GET /rota-inexistente deve retornar 404', async () => {
    const res = await request(app).get('/rota-inexistente');
    expect(res.statusCode).toBe(404);
  });
});
