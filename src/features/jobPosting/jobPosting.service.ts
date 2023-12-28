import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { JobPostingDto } from "src/Dto/jobPosting.dto";
import { JobPosting } from "./jobPosting.schema";
import { Status } from "src/constants/status";


@Injectable()
export class JobPostingService {
   
    constructor(@InjectModel('jobposting')
    private jobPostingModel: Model<JobPosting>){}

    async jobPost( jobPostingDto: JobPostingDto): Promise<any>  {
      const { title, application,status,location,accountId ,salary,expectedSalary,timeAvailability,jobDescription,skill,minExp,maxExp} = jobPostingDto;

        const post = await this.jobPostingModel.create({
          title,
          application,
          location,
          status : Status.Active,
          accountId,
          salary,
          expectedSalary,
          jobDescription,
          skill,
          minExp,
          maxExp,
          timeAvailability,
          isActive: true,
          deletedAt:null
        });
        return post;
      }

    async findJobPostingById(id: string): Promise<any | null> {
        return this.jobPostingModel.findById(id).exec();
         
      }
        
    //   async getAllJobPost():  Promise<any>{
    //     return await this.jobPostingModel.find();
        
    //  }

    async getAllJobPost():  Promise<any>{
      return await this.jobPostingModel.aggregate([
          {
            $sort:({"isActive": -1,"createdAt" : -1})
          },
        ])    
   }
     
     async deActivatePostById(id: string): Promise<any | null> {
        const currentDate = new Date();
        const deActivate = "deActivate";
        return this.jobPostingModel.findByIdAndUpdate(id, { isActive: false ,deletedAt : currentDate, status : deActivate},{ new: true }).exec();
      }

      async updateJobPostingById(id: string, updateUserDto: JobPostingDto): Promise<any | null> {
        return this.jobPostingModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
      }  

}