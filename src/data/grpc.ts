import { Client } from 'chiral-db-grpc-client-ts';

const client = new Client('http://demo.chiral.one', '8080');

export { client }
