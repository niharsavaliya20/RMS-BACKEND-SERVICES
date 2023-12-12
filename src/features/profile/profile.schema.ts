import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from '../user/user.schema';
 
  @Schema({
  timestamps: true,
})

export class Profile extends Document {

  @Prop()
  company: string;

  @Prop()
  experience: string;

  @Prop()
  designation: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  userId: User;
}


export const ProfileSchema = SchemaFactory.createForClass(Profile);


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
