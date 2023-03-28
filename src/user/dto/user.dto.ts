import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, IsString, MaxLength } from "class-validator";
import { UserRole } from "../../db/enums/userRole.enum";

export class UserDto {
    @IsString()
    @MaxLength(50)
    @ApiProperty()
    id: string;
  
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

    @IsEnum(UserRole)
    @ApiProperty()
    role: UserRole;
}