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

describe('Sube un archivo mediante una petición', () => {
  it('valida si no se indica un archivo, retornará distinto 200', async () => {
    const response = await request(app).post('/file/upload');

    expect(response.status).not.toBe(200);
  });
  it('valida si se proporciona un archivo, retornará 200', async () => {
    const response = await request(app).post('/file/upload').attach('file', `${__dirname}/__mocks__/testFile`);
    expect(response.status).toBe(200);
  });
  it('valida si se indican múltiples archivos, retornará distinto 200', async () => {
    const response = await request(app).post('/file/upload').attach('file', `${__dirname}/__mocks__/testFile`).attach('file2', `${__dirname}/__mocks__/testFile`);
    expect(response.status).not.toBe(200);
  });
});
