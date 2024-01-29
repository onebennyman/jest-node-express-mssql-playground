# jest-node-express-mssql-playground

### Requisitos

Antes de comenzar, asegúrate de tener instalado Node.js y npm en tu máquina. Además, para ejecutar tests que dependen de una base de datos, es necesario levantar una instancia de MSSQL. Puedes utilizar el archivo **docker-compose.yaml** proporcionado para configurar un contenedor. **Ten precaución, ya que los tests borran datos de la base de datos.**

También puedes lanzar el siguiente docker run: 
```bash
sudo docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=ECO6hQ620ubQ" -p 1433:1433 --name sql -d -e "MSSQL_PID=Express" mcr.microsoft.com/mssql/server:2022-latest
```

Asegúrate de tener una base de datos llamada _TEST_ en MSSQL. La configuración de la base de datos se puede realizar en el archivo .env

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



[express-validator](https://www.npmjs.com/package/express-validator)

[express-fileupload](https://www.npmjs.com/package/express-fileupload)