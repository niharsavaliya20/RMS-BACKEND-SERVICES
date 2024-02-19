import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from '../user/user.schema';
 
  @Schema({
  timestamps: true,
})

export class employeeProfile extends Document {

  @Prop()
  designation: string;

  @Prop()
  experience: string;

  @Prop()
  currentSalary: string;

  @Prop()
  expectedSalary: string;

  @Prop()
  gender: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  city: string;

  @Prop()
  state: string;

  @Prop()
  skill: [];

  @Prop()
  address: string;

  @Prop()
  profilePicture: string;

  @Prop()
  objective: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  userId: User;
}

export const EmployeeProfileSchema = SchemaFactory.createForClass(employeeProfile);
