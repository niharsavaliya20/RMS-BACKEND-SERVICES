import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
 
  @Schema({
  timestamps: true,
})

export class User extends Document {

  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  loginType: string;

  @Prop()
  roles: string[];

  @Prop()
  isActive: boolean;

}

export const UserSchema = SchemaFactory.createForClass(User);


//   @Prop({
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Profile',
     
//   })
//   profile: Profile;

// { unique: [true, 'Duplicate email entered'] }


// column : {
//   name : String,
//   email : String,
//   password : String,
//   loginType : String,
//   roles : [],

//   relations: {
//     profile: {
//       type: 'one-to-one',
//       target: 'Profile',
//       cascade: true,
//       eager: true,
//     },
//   },
// }