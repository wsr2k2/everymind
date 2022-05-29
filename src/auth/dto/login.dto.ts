import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class LoginUserDto {
    
    @ApiProperty({
        example: 'email@email.com'
    })
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        example: 'Password123#'
    })
    @IsNotEmpty()
    password: string;
}