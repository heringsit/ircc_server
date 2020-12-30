import { Args, InputType, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateUserDto } from "./entities/dtos/create-user.dto";
import { User } from "./entities/user.entity";
import { UserService } from "./user.service";

@Resolver(of => User)
export class UserResolver{
    constructor(private readonly userService: UserService){

    }

    // @Query(returns => [User])
    // users(@Args('id') id:string): User[] {
    //     console.log(id);
    //     return this.userService.getAll();
    // }

    @Query(returns => [User])
    users(): Promise<User[]> {
        return this.userService.getAll();
    }  

    @Mutation(returns => Boolean)
    async createUser(@Args('input') createUserDto : CreateUserDto): Promise<boolean>{
        console.log(" >>> ", createUserDto)
        try{
            await this.userService.createUser(createUserDto);
            return true;
        }catch(e){
            console.log(e);
            return false;
        }
    }



}