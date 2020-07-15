import 'reflect-metadata';
import connectionOptions from './config/connectionOptions';
import { createConnection } from 'typeorm';
import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import routes from './routes';

const PORT = 5002;

createConnection(connectionOptions)
  .then(async () => {
    const app = express();

    app.use(helmet());
    app.use(bodyParser.json());

    app.use('/', routes);

    app.listen(PORT, () => {
      console.log('Server started on port ' + PORT);
    });
  })
  .catch(error => console.log(error));
