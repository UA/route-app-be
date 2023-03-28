import { AutoMap } from "@automapper/classes";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCoordinateDto {
  @AutoMap()
  @IsNotEmpty()
  coordinates:  {type: [Number], default: [0, 0]}[];

  @IsNotEmpty()
  @IsString()
  @AutoMap()
  userId: string;
}
