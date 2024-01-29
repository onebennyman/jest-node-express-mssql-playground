const request = require('supertest');
const app = require('../../app');

describe('Subir archivos al servidor - get 200', () => {
  /**
  * * Cómo lo veríamos en un retorno de supertest para juntarlo todo
  */
  it('confirma que la ruta atiende a peticiones', async () => request(app)
    .get('/file/upload')
    .expect(200));

  /**
  * * Cómo lo veríamos destructurando la respuesta para separar
  */
  it('confirma que la ruta atiende a peticiones', async () => {
    const response = await request(app).get('/file/upload');

    expect(response.status).toBe(200);
  });
});
