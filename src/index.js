require('dotenv').config();
const express = require('express');
const { generateTextDecorated } = require('./utils/logDecorator');

const port = process.env.SERVER_PORT || 3000;

const app = express();

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(generateTextDecorated(`API Iniciada:  http://localhost:${port}`));
});
