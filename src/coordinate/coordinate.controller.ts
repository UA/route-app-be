import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, NotFoundException } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../guards/auth.guard';
import { UserService } from '../user/user.service';
import { CoordinateService } from './coordinate.service';
import { CoordinateDto } from './dto/coordinate.dto';
import { CreateCoordinateDto } from './dto/create-coordinate.dto';

@Controller('coordinates')
@ApiTags('Coordinate')
@ApiBearerAuth()
@UseGuards(AuthGuard())
export class CoordinateController {
  constructor(private readonly coordinateService: CoordinateService,
    private readonly userService: UserService) {}

  @Post()
  async create(@Body() coordinateDto: CreateCoordinateDto)  {
    const user = await this.userService.findOne(coordinateDto.userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const coordinate = await this.coordinateService.findAll(coordinateDto.userId);
    if(coordinate){
      return await this.coordinateService.update(coordinate.id, coordinateDto,user);
    }else{
      return await this.coordinateService.create(coordinateDto, user);
    }
    
  }

  @Get(':userId')
  async findAll(@Param('userId') userId: string): Promise<CoordinateDto> {
    const coordinate = await this.coordinateService.findAll(userId);
    return {
      id: coordinate.id,
      user: coordinate.user,
      coordinates: coordinate.coordinates
    } as CoordinateDto ;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coordinateService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCoordinateDto: UpdateCoordinateDto) {
  //   return this.coordinateService.update(id, updateCoordinateDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coordinateService.remove(id);
  }
}
