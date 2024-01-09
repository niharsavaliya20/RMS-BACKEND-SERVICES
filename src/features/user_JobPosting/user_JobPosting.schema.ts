import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Account } from '../account/account.schema';

@Schema({
  timestamps: true,
})

export class UserJobPosting extends Document {


}
export const UserJobPostingSchema = SchemaFactory.createForClass(UserJobPosting);