import { Body, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ProfileDto } from "src/Dto/profile.dto";
import { Profile, ProfileSchema } from "./profile.schema";

@Injectable()

export class ProfileService{

    constructor(@InjectModel('profile')
    private profileModel: Model<Profile>){}

    async getDetail( profileDto: ProfileDto): Promise<Profile>  {
        const profile = await this.profileModel.create(profileDto);
        return profile;
      }

   async getAllProfiles():  Promise<Profile[]>{
      const profile = await this.profileModel.find();
      return profile;
   }

   async findOne(experience: string): Promise<Profile | null> {
       return this.profileModel.findOne({experience}).exec();
   }
}