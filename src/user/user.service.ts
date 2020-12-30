import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./entities/dtos/create-user.dto";
import { User } from "./entities/user.entity";

@Injectable()
export class UserService{
    constructor(
        @InjectRepository(User) 
        private readonly users: Repository<User>){
        
    }
    getAll() : Promise<User[]>{
        return this.users.find();
    }

    createUser(createUserDto : CreateUserDto): Promise<User>{
        const newUser = this.users.create(createUserDto);
        return this.users.save(newUser);
    }
}
