import { AutoMap } from '@automapper/classes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserRole } from '../enums/userRole.enum';

@Schema({
  timestamps: true,
})
export class User extends Document {
  @Prop({ required: true })
  @AutoMap()
  firstName: string;

  @Prop({ required: true })
  @AutoMap()
  lastName: string;

  @Prop({ unique: [true, 'Duplicate email entered'] })
  @AutoMap()
  email: string;

  @Prop({ required: true })
  @AutoMap()
  password: string;

  @Prop({
    default: UserRole.User,
    enum: UserRole,
    required: true
  })
  @AutoMap()
  role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);