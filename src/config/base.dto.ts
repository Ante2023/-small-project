import { IsDate, IsOptional, IsUUID } from "class-validator";

export class BaseDTO{
    @IsUUID()// gestiona el ID
    @IsOptional() // 
    id!: string; //id!: string "asegura será string" id: string | undefined "o string o undefined"
    
    @IsDate()
    @IsOptional()
    createdAt!:Date; 
    
    @IsDate()
    @IsOptional()
    updatedAt!:Date; 
}