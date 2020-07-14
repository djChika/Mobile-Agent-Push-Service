import 'reflect-metadata';
import { ConnectionOptions } from 'typeorm';
import credentials from './credentials.json';
import { Notification_Subscribers } from '../entity/Notification_Subscribers';

const connectionOptions: ConnectionOptions = {
  type: 'mssql',
  host: credentials.host,
  domain: credentials.domain ?? undefined,
  schema: 'dbo',
  username: credentials.username,
  password: credentials.password,
  database: credentials.database,
  entities: [Notification_Subscribers],
  synchronize: true,
  options: {
    cryptoCredentialsDetails: {
      minVersion: 'TLSv1'
    },
    encrypt: false
  }
};

export default connectionOptions;
