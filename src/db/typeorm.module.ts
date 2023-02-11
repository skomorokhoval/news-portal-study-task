import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfiguration } from '../config';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host:  dbConfiguration.host,
      port:  dbConfiguration.port,
      username: dbConfiguration.username,
      password: dbConfiguration.password,
      database:  dbConfiguration.database,
      entities: ['dist/entities/**/*.entity.js'],
      migrations: ['dist/db/migrations/**/*.js'],
      synchronize: true,
      //cli: {migrationsDir : 'src/db/migrations'}
    }),
  ],
})
export class TypeormModule{}
