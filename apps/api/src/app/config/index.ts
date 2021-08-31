import { MongooseModuleOptions } from '@nestjs/mongoose';
import { resolve } from 'path';

const pathCert = resolve(__dirname, './cert.pem');

export const CONNECTION_STRING =
  'mongodb+srv://cluster0.tdsuc.mongodb.net/myFirstDatabase?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority';

export const getCredentials = (): MongooseModuleOptions => {
  return {
    sslKey: pathCert,
    sslCert: pathCert,
  };
};
