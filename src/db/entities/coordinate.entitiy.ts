import { AutoMap } from '@automapper/classes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from './user.entity';

@Schema({
  timestamps: true,
})
export class Coordinate extends Document {
  @Prop({ required: true })
  @AutoMap()
  coordinates:  {type: [Number], default: [0, 0]}[]
  
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required:true, unique:true })
  user: User;
}

export const CoordinateSchema = SchemaFactory.createForClass(Coordinate);