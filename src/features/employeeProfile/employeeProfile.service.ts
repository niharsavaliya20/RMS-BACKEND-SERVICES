import { Body, Delete, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { employeeProfile } from "./employeeProfile.schema";
import { EmployeeProfileDto } from "src/Dto/employeeProfile.dto";

@Injectable()

export class EmployeeProfileService{

    constructor(@InjectModel('employeeProfile')
    private employeeProfileModel: Model<employeeProfile>){}

    async getDetail( employeeprofileDto: EmployeeProfileDto): Promise<employeeProfile>  {
        const profile = await this.employeeProfileModel.create(employeeprofileDto);
        return profile;
      }

    async findById(id: string): Promise<employeeProfile | null> {
        return this.employeeProfileModel.findById(id).exec();
      }  

   async getAllProfiles():  Promise<employeeProfile[]>{
      const profile = await this.employeeProfileModel.find();
      return profile;
   }

   async findOne(experience: string): Promise<employeeProfile | null> {
       return this.employeeProfileModel.findOne({experience}).exec();
   }

   async deleteEmployeeById(id: string): Promise<any | null> {
    return this.employeeProfileModel.findByIdAndDelete(id).exec();
  }

  async updateUserEmployeeProfileByUserId(userId: string, employeeprofileDto: EmployeeProfileDto): Promise<any | null> {
    return this.employeeProfileModel.findOneAndUpdate({userId}, employeeprofileDto, { new: true }).exec();
  }

   
}