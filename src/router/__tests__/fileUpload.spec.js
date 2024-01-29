const request = require('supertest');
const app = require('../../app');
const FileDir = require('../../sequelize/models/fileDir');

jest.mock('../../sequelize/models/fileDir');
const mockFindOrCreate = jest.fn();
const mockUpdate = jest.fn();
FileDir.findOrCreate = mockFindOrCreate;
FileDir.update = mockUpdate;

const fileToCreate = {
  md5: 'f0c506b42c2a129fbeb29f468ca8fa65',
  fileName: 'testFile',
};

async function realizarRequestSinAttach() {
  return request(app).post('/file/upload');
}
async function realizarRequestConAttach() {
  return request(app).post('/file/upload').attach('file', `${__dirname}/__mocks__/testFile`);
}
async function realizarRequestConDobleAttach() {
  return request(app).post('/file/upload').attach('file', `${__dirname}/__mocks__/testFile`).attach('file2', `${__dirname}/__mocks__/testFile`);
}

describe('Sube un archivo mediante una petición', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('valida si no se indica un archivo, retornará distinto 200', async () => {
    const response = await realizarRequestSinAttach();

    expect(response.status).not.toBe(200);
  });
  it('valida si se proporciona un archivo, retornará 200', async () => {
    mockFindOrCreate.mockResolvedValue([{}, true]);

    const response = await realizarRequestConAttach();
    expect(response.status).toBe(200);
  });
  it('valida si se indican múltiples archivos, retornará distinto 200', async () => {
    const response = await realizarRequestConDobleAttach();
    expect(response.status).not.toBe(200);
  });
  it('si se entrega nuevamente el mismo archivo, retornará 200', async () => {
    mockFindOrCreate.mockResolvedValue(
      [{ fileName: fileToCreate.fileName, update: mockUpdate }, false],
    );
    mockUpdate.mockResolvedValue({ fileDir: {} });

    const response = await realizarRequestConAttach();
    expect(response.status).toBe(200);
  });
});

describe('Comprobamos la lógica de crear un archivo en la BD', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('si subimos un archivo, se realiza una llamada a la BD para buscar o crear el archivo', async () => {
    jest.spyOn(FileDir, 'findOrCreate');
    await realizarRequestConAttach();
    expect(mockFindOrCreate).toHaveBeenCalledTimes(1);
    expect(mockFindOrCreate).toHaveBeenCalledWith(
      expect.objectContaining({ where: { md5: fileToCreate.md5 } }),
    );
  });
  it('si subimos un archivo y este no existe, no se realiza el update', async () => {
    mockFindOrCreate.mockResolvedValue([{ update: mockUpdate }, true]);
    jest.spyOn(FileDir, 'update');
    await realizarRequestConAttach();
    expect(mockUpdate).toHaveBeenCalledTimes(0);
  });
  it('si subimos un archivo y este si existe, se realiza el update', async () => {
    const nombreArchivoExistente = 'myExistingFile';
    mockFindOrCreate.mockResolvedValue([
      { fileName: nombreArchivoExistente, md5: fileToCreate.md5, update: mockUpdate },
      false]);
    jest.spyOn(FileDir, 'update');
    await realizarRequestConAttach();
    expect(mockUpdate).toHaveBeenCalledTimes(1);
    expect(mockUpdate).toHaveBeenCalledWith(
      expect.objectContaining({ fileName: `${nombreArchivoExistente}, ${fileToCreate.fileName}` }),
    );
  });
  it('si subimos un archivo y este si existe con el mismo nombre, no se llama al método de actualización a la BD', async () => {
    const nombreArchivoExistente = fileToCreate.fileName;
    mockFindOrCreate.mockResolvedValue([
      { fileName: nombreArchivoExistente, update: mockUpdate },
      false]);
    jest.spyOn(FileDir, 'update');
    await realizarRequestConAttach();
    expect(mockUpdate).toHaveBeenCalledTimes(0);
  });
});

describe('Comprobamos la lógica de crear un archivo en la BD llevando al límite', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('si subimos un archivo y el fileName por alguna razón retorna undefined, realizamos el update', async () => {
    mockFindOrCreate.mockResolvedValue([
      { fileName: undefined, md5: fileToCreate.md5, update: mockUpdate },
      false]);
    jest.spyOn(FileDir, 'update');
    await realizarRequestConAttach();
    expect(mockUpdate).toHaveBeenCalledTimes(1);
    expect(mockUpdate).toHaveBeenCalledWith(
      expect.objectContaining({ fileName: `${fileToCreate.fileName}` }),
    );
  });
  it('si subimos un archivo y el md5 por alguna razón retorna undefined, no realizamos el update', async () => {
    mockFindOrCreate.mockResolvedValue([
      { md5: undefined, update: mockUpdate },
      false]);
    jest.spyOn(FileDir, 'update');
    const response = await realizarRequestConAttach();
    expect(mockUpdate).toHaveBeenCalledTimes(0);
    expect(response.status).not.toBe(200);
  });
});
