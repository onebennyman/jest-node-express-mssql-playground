# Jest Node Express Mssql playground

Bienvenido al Jest Node Express MSSQL Playground, un espacio diseñado para aprender y practicar la realización de pruebas y mocks utilizando Jest en un entorno Node.js con Express y MSSQL. La comunicación entre Node.js y MSSQL se logra mediante Sequelize.

### Descripción del Proyecto

Este repositorio es un playground diseñado para aprender a realizar pruebas y mocks utilizando Jest en un entorno Node.js con Express y MSSQL. La comunicación entre Node.js y Mssql se realiza mediante [sequelize](https://sequelize.org/)

Este proyecto se centra en la subida de archivos, donde Node.js se encarga de validar la solicitud para confirmar la entrega de un único archivo. En la base de datos (configurada con Microsoft SQL), cada archivo único, identificado por su MD5, se registra en la tabla FileDir. Se almacenan también los posibles nombres con los que se han subido, separados por comas.

Se han creado dos tipos de pruebas: una que requiere una conexión a la base de datos real, implementada en **'fileUpload.test.js'**, y otra en la que se ha mockeado la llamada a la base de datos implementado en **'fileUpload.spec.js'**. Observa cómo al realizar mocks, podemos llevar al límite la programación, manejando situaciones que podrían no ocurrir en un uso típico. Esto nos permite refactorizar el código para encontrar posibles errores futuros y ejecutar pruebas de manera más rápida.

### Requisitos

Antes de comenzar, asegúrate de tener instalado Node.js y npm en tu máquina. Además, para ejecutar tests que dependen de una base de datos, es necesario levantar una instancia de MSSQL. Puedes utilizar el archivo **docker-compose.yaml** proporcionado para configurar un contenedor. **Ten precaución, ya que los tests borran datos de la base de datos.**

Asegúrate de tener una base de datos llamada _TEST_ en MSSQL. La configuración de la base de datos se puede realizar en el archivo .env.

Para instalar las dependencias, ejecuta el siguiente comando:

```bash
npm install
```

Luego, puedes ejecutar las pruebas con los siguientes scripts:

```bash
npm test                # Ejecuta las pruebas una vez
npm run test:watch      # Ejecuta las pruebas en modo de observación
npm run test:coverage   # Ejecuta las pruebas y genera un informe de cobertura
```

Para iniciar el servidor en modo desarrollo:

```bash
npm run dev
```

### Cosas a mejorar

- Mejorar la validación del archivo
- Realizar una comprobación del md5 del archivo mediante virus total
- Desarrollar, y con sus tests, el guardado del archivo subido

### Enlaces de interés

- [express-validator](https://www.npmjs.com/package/express-validator)
- [express-fileupload](https://www.npmjs.com/package/express-fileupload)
- [docker mssql](https://hub.docker.com/_/microsoft-mssql-server)
- [sequelize](https://sequelize.org/)