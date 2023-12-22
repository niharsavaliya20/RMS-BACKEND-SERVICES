import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { JobPostingDto } from "src/Dto/jobPosting.dto";
import { JobPosting } from "./jobPosting.schema";


@Injectable()
export class JobPostingService {
   
    constructor(@InjectModel('jobposting')
    private jobPostingModel: Model<JobPosting>){}

    async jobPost( jobPostingDto: JobPostingDto): Promise<any>  {
      const { title, application,status,location}= jobPostingDto;

        const post = await this.jobPostingModel.create({
          title,
          application,
          location,
          status,
          isActive: true,
          deletedAt:null
        });
        return post;
      }

    async findJobPostingById(id: string): Promise<any | null> {
        return this.jobPostingModel.findById(id).exec();
      }
      
      async getAllJobPost():  Promise<any>{
        const jobPost = await this.jobPostingModel.find();
         return jobPost
     }
     
     async deActivatePostById(id: string): Promise<any | null> {
        const currentDate = new Date();
        return this.jobPostingModel.findByIdAndUpdate(id, { isActive: false ,deletedAt : currentDate},{ new: true }).exec();
      }

      async updateJobPostingById(id: string, updateUserDto: JobPostingDto): Promise<any | null> {
        return this.jobPostingModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
      }  

}