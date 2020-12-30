import { Field, InputType, ArgsType, OmitType} from "@nestjs/graphql";
import { Length } from "class-validator";
import { CRS } from "../crs.entity";


@InputType()
export class CreateCrsDto extends OmitType(CRS, ['id'], InputType){

}