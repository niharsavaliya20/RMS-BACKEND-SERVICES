import { Body, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { employerProfile } from "./employer.schema";
import { EmployerProfileDto } from "src/Dto/employer.dto";

@Injectable()

export class EmployerProfileService{

    constructor(@InjectModel('employerProfile')
    private employerProfileModel: Model<employerProfile>){}

    async getDetail( profileDto: EmployerProfileDto): Promise<employerProfile>  {
        const profile = await this.employerProfileModel.create(profileDto);
        return profile;
      }

      async findById(id: string): Promise<employerProfile | null> {
        return this.employerProfileModel.findById(id).exec();
      }  

   async getAllProfiles():  Promise<employerProfile[]>{
      const profile = await this.employerProfileModel.find();
      return profile;
   }

   async findOne(designation: string): Promise<employerProfile | null> {
       return this.employerProfileModel.findOne({designation}).exec();
   }

   async deleteEmployerById(id: string): Promise<any | null> {
    return this.employerProfileModel.findByIdAndDelete(id).exec();
  }
}