import { MongooseModuleOptions } from '@nestjs/mongoose';
import { resolve } from 'path';

const pathCert = resolve(__dirname, './cert.pem');

export const CONNECTION_STRING = process.env.CONNECTION_STRING;

export const getCredentials = (): MongooseModuleOptions => {
  return {
    sslKey: pathCert,
    sslCert: pathCert,
  };
};
