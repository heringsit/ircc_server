import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import {join} from 'path'
import { UserModule } from './user/user.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { CRS } from './crs/entities/crs.entity';
import { CrsModule } from './crs/crs.module';
import { UploadsModule } from './uploads/uploads.module';
import { CreateSchemaModule } from './schema/schema.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      "type": "postgres",
      "host": "localhost",
      "port": 5432,
      "username": "postgres",
      "password": "herings",
      "database": "ircc",
      "synchronize": true,
      "logging": false,
      "entities":[User, CRS],
    }),
    GraphQLModule.forRoot({autoSchemaFile: true}),
    UserModule,
    CrsModule,
    UploadsModule,
    CreateSchemaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
