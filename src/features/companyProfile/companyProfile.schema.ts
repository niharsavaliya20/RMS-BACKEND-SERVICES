import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { Account } from "../account/account.schema";
import { IsNotEmpty } from "class-validator";


@Schema({
    timestamps: true,
  })

export class CompanyProfile extends Document {

  @Prop()
  industry: string;

  @Prop()
  companySize: string;

  @Prop()
  aboutCompany: string;

  @Prop()
  foundedIn: string;

  @Prop()
  phone: string;

  @Prop()
  email: string;

  @Prop()
  location: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'account',
  })
  @IsNotEmpty()
  accountId: Account;

}

export const CompanyProfileSchema = SchemaFactory.createForClass(CompanyProfile);