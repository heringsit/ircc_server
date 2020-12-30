import { Args, InputType, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateCrsDto } from "./entities/dtos/create-crs.dto";
import { CRS } from "./entities/crs.entity";
import { CrsService } from "./crs.service";

@Resolver(of => CRS)
export class CrsResolver{
    constructor(private readonly crsService: CrsService){

    }

    @Query(returns => [CRS])
    users(): Promise<CRS[]> {
        return this.crsService.getAll();
    }  

    @Mutation(returns => Boolean)
    async createCrs(@Args('input') createCrsDto : CreateCrsDto): Promise<boolean>{
        console.log(" >>> ", createCrsDto)
        try{
            await this.crsService.createUser(createCrsDto);
            return true;
        }catch(e){
            console.log(e);
            return false;
        }
    }


}