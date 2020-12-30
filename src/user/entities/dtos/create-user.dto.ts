import { Field, InputType, ArgsType, OmitType} from "@nestjs/graphql";
import { Length } from "class-validator";
import { User } from "../user.entity";


@InputType()
export class CreateUserDto extends OmitType(User, ['id'], InputType){

}