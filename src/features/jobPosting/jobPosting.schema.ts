import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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

  @Prop()
  isActive: boolean;

  @Prop()
  deletedAt: Date;

}
export const JobPostingSchema = SchemaFactory.createForClass(JobPosting);
