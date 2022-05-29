import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsPhoneNumber, Matches, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {

    @ApiProperty({
      example: 'User name'
    })
    @IsNotEmpty({
        message: 'The name must be informed'
    })
    @MaxLength(200, {
        message: 'Name must be less than 200 characters',
      })
    name: string;
    
    @ApiProperty({
      example: 'email@email.com'
    })
    @IsNotEmpty({
        message: 'Email cannot be empty'
    })
    @IsEmail({
        message: 'Use an valid email'
    })
    @MaxLength(200, {
        message: 'Email address must be less than 200 characters',
      })
    email: string;

    @ApiProperty({
      example: '11912345678'
    })
    @IsNotEmpty({
        message: 'Phone number cannot be empty'
    })
    @IsPhoneNumber("BR")
    @MinLength(11)
    phone: string;

    @ApiProperty({
      example: 'Password123#'
    })
    @IsNotEmpty({
        message: 'Password number cannot be empty'
    })
    @MinLength(6,{
        message: 'Password must be between 6 and 64 characters long',
      })
    @MaxLength(60)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z])(?=.*[@#$%^&+=]).*$/, {
    message:
      'Password must be 1 special character and uppercase and lowercase letter',
  })
    password: string;

    @ApiProperty({
      example: 'Password123#'
    })
    @IsNotEmpty({
        message: 'Password number cannot be empty'
    })
    @MinLength(6)
    @MaxLength(60)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z])(?=.*[@#$%^&+=]).*$/, {
    message: 'Password confirmation must be the same as password',

  })
    passwordConfirmation: string;
}