import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from '../user/user.schema';
 
  @Schema({
  timestamps: true,
})

export class employerProfile extends Document {

  @Prop()
  company: string;

  @Prop()
  contactPerson: string;

  @Prop()
  designation: string;

  @Prop()
  location: string;


  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  userId: User;
}


export const EmployerProfileSchema = SchemaFactory.createForClass(employerProfile);
