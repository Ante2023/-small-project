import { CreateDateColumn, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";

export abstract class BaseEntity{
    //
    @PrimaryGeneratedColumn("uuid")
    id!: string; //id!: string "asegura será string" id: string | undefined "o string o undefined"
    
    @CreateDateColumn({
        name:"created_at",
        type:"timestamp",
    })
    createdAt!:Date;
    
    @UpdateDateColumn({
        name:"updated_at",
        type:"timestamp",
    })
    updatedAt!:Date;   
}