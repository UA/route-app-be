import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    @MaxLength(50)
    @ApiProperty()
    firstName: string;
  
    @IsString()
    @MaxLength(50)
    @ApiProperty()
    lastName: string;
  
    @IsEmail()
    @IsNotEmpty()
    @MaxLength(250)
    @ApiProperty()
    email: string;
  
    @IsString()
    @MinLength(8)
    @MaxLength(32)
    @IsNotEmpty()
    @ApiProperty()
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
      message:
        'Password is too weak. (It must includes uppercase and lowercase letters and at least one number or punctuation mark.)',
    })
    password: string;
}