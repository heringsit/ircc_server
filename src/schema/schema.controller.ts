import {
  Controller,
  Post,
  Get,
  Body,
} from '@nestjs/common';
import {SchemaService} from './schema.provider';

@Controller('schema')
export class CreateSchemaController {
  constructor(private schemaService: SchemaService) {}

  @Post()
  createSchema(@Body('project') project) : Promise<boolean> {
    return this.schemaService.create(project);
  }

  @Get()
  getSchema(){
    return this.schemaService.getSchemas();
  }

}
