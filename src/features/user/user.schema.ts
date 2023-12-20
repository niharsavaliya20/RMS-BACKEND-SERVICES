import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
 
  @Schema({
  timestamps: true,
})

export class User extends Document {

  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  loginType: string;

  @Prop()
  roles: string[];

  @Prop()
  isActive: boolean;

  @Prop()
  deletedAt: Date;

}

export const UserSchema = SchemaFactory.createForClass(User);