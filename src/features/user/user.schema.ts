import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Account } from '../account/account.schema';
 
  @Schema({
  timestamps: true,
})

export class User extends Document {

  @Prop()
  name: string;

  @Prop({ unique: [true, 'Duplicate email entered'] })
  email: string;

  @Prop()
  password: string;

  @Prop()
  loginType: string;

  @Prop()
  roles: string[];

  @Prop()
  companyName: string;

  @Prop()
  isActive: boolean;

  @Prop()
  deletedAt: Date;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
  })
  accountId: Account;

}

export const UserSchema = SchemaFactory.createForClass(User);