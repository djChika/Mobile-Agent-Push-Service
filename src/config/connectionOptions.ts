import 'reflect-metadata';
import { ConnectionOptions } from 'typeorm';
import credentials from './credentials.json';
import { Notification_Subscribers } from '../entity/Notification_Subscribers';
import { Notifications } from '../entity/Notifications';

const connectionOptions: ConnectionOptions = {
  type: 'mssql',
  host: credentials.host,
  schema: 'dbo',
  username: credentials.username,
  password: credentials.password,
  database: credentials.database,
  domain: credentials.domain,
  entities: [Notification_Subscribers, Notifications],
  synchronize: true,
  options: {
    cryptoCredentialsDetails: {
      minVersion: 'TLSv1'
    },
    encrypt: false
  }
};

export default connectionOptions;
