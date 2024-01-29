const request = require('supertest');
const app = require('../../app');

describe('Testea rutas para verificar los middlewares', () => {
  it('confirma los headers necesarios', async () => {
    const response = await request(app).get('/file/upload');

    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/application\/json/);
  });
});
