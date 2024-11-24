import { IsNotEmpty, IsString, Length } from "class-validator";


export class LoginDto {
    @IsNotEmpty()
    @IsString()
    @Length(5,20)
    username:string
    @IsNotEmpty()
    @IsString()
    @Length(8,20)
    password:string
}