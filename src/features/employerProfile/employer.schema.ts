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

// const mongoose = require("mongoose");

// const EmployerProfileSchema = mongoose.model(
//   "EmployeeProfile",
//   new mongoose.Schema({
//     company: String,
//     agecontactPerson: String ,
//     designation: String,
//     location: String,
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: User
//     }
//   })
// );

// module.exports = EmployerProfileSchema;