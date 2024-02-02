import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({
  timestamps: true,
})

export class employee_status extends Document {

  @Prop()
  statusId: string;

  @Prop()
  statusName: string;

  @Prop()
  description: string;

}
export const Employee_StatusSchema = SchemaFactory.createForClass(employee_status);