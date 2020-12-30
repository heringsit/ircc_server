import { Injectable, UploadedFile, UseInterceptors, Post } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateCrsDto } from "./entities/dtos/create-crs.dto";
import { CRS } from "./entities/crs.entity";
import { FileInterceptor } from "@nestjs/platform-express";

@Injectable()
export class CrsService{
    constructor(
        @InjectRepository(CRS) 
        private readonly crs: Repository<CRS>){
        
    }
    getAll() : Promise<CRS[]>{
        return this.crs.find();
    }

    createUser(createCrsDto : CreateCrsDto): Promise<CRS>{
        const newCrs = this.crs.create(createCrsDto);
        return this.crs.save(newCrs);
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile() file) {
        console.log(file);
    }
}
