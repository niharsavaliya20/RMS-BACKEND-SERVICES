import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Account } from '../account/account.schema';
import { JobPosting } from '../jobPosting/jobPosting.schema';
import { User } from '../user/user.schema';

@Schema({
  timestamps: true,
})

export class UserJobPosting extends Document {

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  userId: User;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'JobPosting',
  })
  jobPostingId: JobPosting;
  
    @Prop()
    status: string;
  
    @Prop()
    applied: boolean;
    
}
export const UserJobPostingSchema = SchemaFactory.createForClass(UserJobPosting);