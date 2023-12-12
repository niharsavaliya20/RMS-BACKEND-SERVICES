import { Body, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./user.schema";

@Injectable()

export class UserService{

    constructor(@InjectModel('user')
    private userModel: Model<User>){}

   async getAllSignUp():  Promise<User[]>{
      const profile = await this.userModel.find();
      return profile;
   }

   async findUserWithProfile(): Promise<User[] | null> {
    return this.userModel.aggregate([
            {
                $lookup: {
                  from: 'profiles', // Name of the collection to join
                  localField: '_id',
                  foreignField: 'userId',
                  as: 'profile', // Alias for the joined documents
                },
              },
    ])
  }

  async findByEmail(email: string): Promise<User | null> {
     return this.userModel.findOne({email}).exec();
  }
    
}