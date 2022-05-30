import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsNumberString, IsPhoneNumber, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {

  @ApiProperty({example: 'User name'})
  @IsNotEmpty({message: 'The name must be informed'})
  @MaxLength(200, {message: 'Name must be less than 200 characters',})
  @IsString()
  name: string;
  
  @ApiProperty({example: 'email@email.com'})
  @IsNotEmpty({message: 'Email cannot be empty'})
  @IsEmail({message: 'Use an valid email'})
  @MaxLength(200, {message: 'Email address must be less than 200 characters',})
  @IsString()
  email: string;

  @ApiProperty({example: '11912345678'})
  @IsNotEmpty({message: 'Phone number cannot be empty'})
  @IsPhoneNumber("BR")
  @MinLength(11)
  @IsString()
  phone: string;

  @ApiProperty({example: 'Street name'})
  @IsNotEmpty({message: 'The street must be informed'})
  @MaxLength(200, {message: 'Street must be less than 200 characters',})
  @IsString()
  street: string;

  @ApiProperty({example: '123'})
  @IsNotEmpty({message: 'The number must be informed'})
  @MaxLength(7, {message: 'Number must be less than 7 characters'})
  @IsNumberString()
  number: string;

  @ApiProperty({example: 'Complement description'})
  @IsNotEmpty({message: 'The Complement must be informed'})
  @MaxLength(200, {message: 'Complement must be less than 200 characters',})
  @IsString()
  complement: string;

  @ApiProperty({example: 'District name'})
  @IsNotEmpty({message: 'The District must be informed'})
  @MaxLength(200, {message: 'District must be less than 200 characters',})
  @IsString()
  district: string;

  @ApiProperty({example: 'City name'})
  @IsNotEmpty({message: 'The City must be informed'})
  @MaxLength(200, {message: 'City must be less than 200 characters',})
  @IsString()
  city: string;

  @ApiProperty({example: 'State name'})
  @IsNotEmpty({message: 'The State must be informed'})
  @MaxLength(200, {message: 'State must be less than 200 characters',})
  @IsString()
  state: string;

  @ApiProperty({example: 'Password123#'})
  @IsNotEmpty({ message: 'Password number cannot be empty'})
  @MinLength(6,{message: 'Password must be between 6 and 64 characters long',})
  @MaxLength(60)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z])(?=.*[@#$%^&+=]).*$/, {
  message:'Password must be 1 special character and uppercase and lowercase letter',})
  @IsString()
  password: string;

  @ApiProperty({example: 'Password123#'})
  @IsNotEmpty({message: 'Password number cannot be empty'})
  @MinLength(6)
  @MaxLength(60)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z])(?=.*[@#$%^&+=]).*$/, {
  message: 'Password confirmation must be the same as password',})
  @IsString()
  passwordConfirmation: string;
}