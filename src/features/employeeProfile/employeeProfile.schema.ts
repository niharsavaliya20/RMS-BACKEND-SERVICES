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
  gender: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  city: string;

  @Prop()
  state: string;

  @Prop()
  address: string;

  @Prop()
  profilePicture: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  userId: User;
}

export const EmployeeProfileSchema = SchemaFactory.createForClass(employeeProfile);


// isDeleted: {
    //     type: Boolean,
    //     default: false
    // },
    // // createdAt: {
    //     type: Date, default: Date.now
    // },
    // modifiedAt: {
    //     type: Date, default: Date.now
    // },
    // deletedAt: Date
