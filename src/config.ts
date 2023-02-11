import * as dotenv from 'dotenv';


dotenv.config();


export const dbConfiguration = Object.freeze({
  host:  process.env.HOST|| 'localhost',
  port:  Number(process.env.PORT) || 5432,
  username: process.env.POSTGRES_USERNAME || '',
  password: process.env.POSTGRES_PASSWORD|| '',
  database:  process.env.POSTGRES_DATABASE|| '',
});
