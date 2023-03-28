import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Coordinate } from '../db/entities/coordinate.entitiy';
import { User } from '../db/entities/user.entity';
import { CreateCoordinateDto } from './dto/create-coordinate.dto';
import { UpdateCoordinateDto } from './dto/update-coordinate.dto';


@Injectable()
export class CoordinateService {
  constructor(
    @InjectModel(Coordinate.name)
    private coordinateModel: Model<Coordinate>,
  ) {}

  async create(createCoordianteDto: CreateCoordinateDto, user: User)  {
    const data = Object.assign(createCoordianteDto, { user: user._id });
    return await this.coordinateModel.create(data);
  }

  async findAll(userId: string): Promise<Coordinate> {
    const isValidId = mongoose.isValidObjectId(userId);

    if (!isValidId) {
      throw new BadRequestException('Please enter correct id.');
    }
    return await this.coordinateModel.findOne({user: userId});
  }

  async findOne(id: string) {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException('Please enter correct id.');
    }

    const coordiante = await this.coordinateModel.findById(id);

    if (!coordiante) {
      throw new NotFoundException('Coordiante not found.');
    }

    return coordiante;
  }

  async update(id: string, updateCoordianteDto: UpdateCoordinateDto, user: User) {
    const data = Object.assign(updateCoordianteDto, { user: user._id });
    return await this.coordinateModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  async remove(id: string) {
    return await this.coordinateModel.findByIdAndDelete(id);
  }
}
