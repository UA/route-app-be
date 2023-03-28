import { Module } from '@nestjs/common';
import { CoordinateService } from './coordinate.service';
import { CoordinateController } from './coordinate.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CoordinateSchema } from '../db/entities/coordinate.entitiy';
import { UserService } from '../user/user.service';
import { UserSchema } from '../db/entities/user.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Coordinate', schema: CoordinateSchema },
  { name: 'User', schema: UserSchema }])],
  controllers: [CoordinateController],
  providers: [CoordinateService, UserService]
})
export class CoordinateModule {}
