import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { CompanyProfile } from "./companyProfile.schema";
import { CompanyProfileDto } from "src/Dto/companyProfile.dto";


@Injectable()
export class CompanyProfileService{

    constructor(@InjectModel('companyProfile')
    private companyProfileModel: Model<CompanyProfile>){}

    async createCompanyProfile( CompanyProfileDto: CompanyProfileDto,Id): Promise<any>  {
        // const { email, status}= accountDto;
       const{aboutCompany,profilePicture,country ,companySize, foundedIn, email,address, state, phone, location} = CompanyProfileDto
        
        const companyProfile = await this.companyProfileModel.create({aboutCompany,address,country, companySize, profilePicture,state, foundedIn, email, phone, location,accountId : Id});
        return companyProfile;
      }

      async findCompanyProfile(accountId : string): Promise<any | null> {
        return this.companyProfileModel.find({accountId}).exec();
      }

      async getEmployerCompanyProfile(accountId : string): Promise<any | null> {
        return this.companyProfileModel.find({accountId}).exec();
      }

      async findCompanyProfileById(id : string): Promise<any | null> {
        return this.companyProfileModel.findById(id).exec();
      }

      async updateCompanyProfileById(accountId: string, companyProfileDto: CompanyProfileDto): Promise<any | null> {
        return this.companyProfileModel.findOneAndUpdate({accountId}, companyProfileDto, { new: true }).exec();
      }

      async getCompanyProfileByAccountId(accountId: string): Promise<CompanyProfile | null> {
        return this.companyProfileModel.findOne({accountId}).exec();
      }

      async getAllCompanyProfile(): Promise <any | null>{
         const AllCompanyProfile =  this.companyProfileModel.find();
         return AllCompanyProfile
      }
}
