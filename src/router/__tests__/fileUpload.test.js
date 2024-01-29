const request = require('supertest');
const app = require('../../app');
const { initialize, close, dropModelsData } = require('../../sequelize/iniciador');

beforeAll(async () => {
  await initialize();
});
afterAll(async () => {
  await close();
});

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
  beforeAll(async () => {
    await dropModelsData();
    await initialize();
  });
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
  it('si se entrega nuevamente el mismo archivo, retornará 200', async () => {
    // incializa la conexión con la base de datos
    const response = await request(app).post('/file/upload').attach('file', `${__dirname}/__mocks__/testFile`);
    expect(response.status).toBe(200);
  });
});

describe('Prueba de escritura de datos', () => {
  beforeAll(async () => {
    await dropModelsData();
    await initialize();
  });
  const segundosParaLaPeticion = 2;
  it(`el envío de un archivo básico, no debe tardar mas de ${segundosParaLaPeticion} segundos`, async () => {
    const inicio = new Date().getTime();
    await request(app).post('/file/upload').attach('file', `${__dirname}/__mocks__/testFile`);
    const fin = new Date().getTime();
    expect(fin - inicio).not.toBeGreaterThan(segundosParaLaPeticion * 1000);
  });
});
