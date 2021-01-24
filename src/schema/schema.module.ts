import { Module } from '@nestjs/common';
import { CreateSchemaController } from './schema.controller';
import { SchemaService } from './schema.provider';

@Module({
  controllers: [CreateSchemaController],
  providers:[SchemaService],
})
export class CreateSchemaModule {}