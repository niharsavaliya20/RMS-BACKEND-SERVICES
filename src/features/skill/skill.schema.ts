import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

@Schema({
    timestamps: true,
  })
  
  export class Skill extends Document{
  
    @Prop()
    skillId: number;
  
    @Prop()
    name: string;
  
  
  }
  export const SkillSchema = SchemaFactory.createForClass(Skill);