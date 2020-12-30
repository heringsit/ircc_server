import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CRS } from './entities/crs.entity';
import { CrsResolver } from './crs.resolver';
import { CrsService } from './crs.service';

@Module({
    imports:[TypeOrmModule.forFeature([CRS])],
    providers: [CrsResolver, CrsService],
})
export class CrsModule {}
