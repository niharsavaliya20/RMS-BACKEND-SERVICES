import { Body, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
// import { employerProfile } from "./employer.schema";
import { EmployerProfileDto } from "src/Dto/employerProfile.dto";
import { employerProfile } from "./employer.schema";

@Injectable()
export class EmployerProfileService{

    constructor(@InjectModel('employerProfile')
    private employerProfileModel: Model<employerProfile>){}

    async getDetail( profileDto: EmployerProfileDto): Promise<any>  {
        const profile = await this.employerProfileModel.create(profileDto);
        return profile;
      }

      async findById(id: string): Promise<any | null> {
        return this.employerProfileModel.findById(id).exec();
      }  

   async getAllProfiles():  Promise<any[]>{
      const profile = await this.employerProfileModel.find();
      return profile;
   }

   async findOne(designation: string): Promise<any | null> {
       return this.employerProfileModel.findOne({designation}).exec();
   }

   async deleteEmployerById(id: string): Promise<any | null> {
    return this.employerProfileModel.findByIdAndDelete(id).exec();
  }

  async updateUserById(id: string, employerprofileDto: EmployerProfileDto): Promise<any | null> {
    return this.employerProfileModel.findByIdAndUpdate(id, employerprofileDto, { new: true }).exec();
  }

  async updateUserEmployerProfileByUserId(userId: string, employerprofileDto: EmployerProfileDto): Promise<any | null> {
    return this.employerProfileModel.findOneAndUpdate({userId}, employerprofileDto, { new: true }).exec();
  }
}