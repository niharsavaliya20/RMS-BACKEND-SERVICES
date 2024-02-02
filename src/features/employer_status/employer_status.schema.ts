import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({
  timestamps: true,
})

export class employer_status extends Document {

  @Prop()
  statusId: string;

  @Prop()
  statusName: string;

  @Prop()
  description: string;

}
export const Employer_StatusSchema = SchemaFactory.createForClass(employer_status);