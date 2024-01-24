import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Account } from '../account/account.schema';
import { JobPosting } from '../jobPosting/jobPosting.schema';
import { User } from '../user/user.schema';
import { IsNotEmpty } from 'class-validator';

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

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'account',
  })
  @IsNotEmpty()
  accountId: Account;

  @Prop()
  applicantStatus: string;

  @Prop()
  status: string;

  @Prop()
  applied: boolean;

}
export const UserJobPostingSchema = SchemaFactory.createForClass(UserJobPosting);