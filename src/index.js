const app = require('./app');
const { generateTextDecorated } = require('./utils/logDecorator');
const { initialize } = require('./sequelize/iniciador');

const port = process.env.SERVER_PORT || 3000;

app.listen(port, async () => {
  // eslint-disable-next-line no-console
  console.log(generateTextDecorated(`API Iniciada:  http://localhost:${port}`));
  Promise.resolve(initialize()).then(async () => {
    // eslint-disable-next-line no-console
    console.log(generateTextDecorated('Conectado con la DB', '+'));
  }).catch((err) => {
    throw new Error(generateTextDecorated(`Error al conectar con la DB ${err}`, '!'));
  });
});
