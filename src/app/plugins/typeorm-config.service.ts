import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
@Injectable()
export class TypeOrmDbConfig implements TypeOrmOptionsFactory {
  createTypeOrmOptions(connectionName?: string): TypeOrmModuleOptions {

    return {
      type: 'mysql',
      host: process.env.DB_MYSQL_HOST,
      port: +process.env.DB_MYSQL_PORT,
      username: process.env.DB_MYSQL_USERNAME,
      password: process.env.DB_MYSQL_PASSWORD,
      database: process.env.DB_MYSQL_NAME,
      entities: ['dist/modules/**/*.entity.js'],
      migrations: ['dist/database/migrations/*.js'],
      synchronize:true
    };
  }
}
