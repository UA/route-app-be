import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";
import { UserDto } from "../../user/dto/user.dto";

export class CoordinateDto {
    @IsString()
    @ApiProperty()
    @AutoMap()
    @IsNotEmpty()
    id: string;
  
    @AutoMap()
    coordinates:  {type: [Number], default: [0, 0]}[]
  
    @IsNotEmpty({ message: 'You cannot pass user id' })
    user: UserDto;
}