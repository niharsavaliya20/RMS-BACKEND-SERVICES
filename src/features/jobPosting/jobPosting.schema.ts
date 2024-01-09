import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Account } from '../account/account.schema';
import { IsNotEmpty } from 'class-validator';

@Schema({
  timestamps: true,
})

export class JobPosting extends Document {

  @Prop()
  title: string;

  @Prop()
  application: string;

  @Prop()
  location: string;

  @Prop()
  status: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'account',
  })
  @IsNotEmpty()
  accountId: Account;

  @Prop()
  jobDescription: string;
  
  @Prop()
  skill: string;

  @Prop()
  salary: string;

  @Prop()
  expectedSalary: string;

  @Prop()
  jobType: string;

  @Prop()
  minExp: string;

  @Prop()
  maxExp: string;

  @Prop()
  timeAvailability: string;

  @Prop()
  selectedTimezone: string;

  @Prop()
  selectedDays: string[];

  @Prop()
  isActive: boolean;

  @Prop()
  deletedAt: Date;

}
export const JobPostingSchema = SchemaFactory.createForClass(JobPosting);
