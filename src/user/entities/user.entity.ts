import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class User{

    @PrimaryGeneratedColumn()
    id:number;

    @Field(type => String)
    @Column()
    name: string;

    @Field(type=> String, {nullable:true})
    @Column()
    pass: string;
    
}