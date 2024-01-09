import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { JobPostingDto } from "src/Dto/jobPosting.dto";
import { JobPosting, JobPostingSchema } from "./jobPosting.schema";
import { Status } from "src/constants/status";
import moment from "moment-timezone";


@Injectable()
export class JobPostingService {

  constructor(@InjectModel('jobposting')
  private jobPostingModel: Model<JobPosting>) { }

  async jobPost(jobPostingDto: JobPostingDto): Promise<any> {
  
    const { title, application, status,location,accountId, 
      salary, jobType, expectedSalary, timeAvailability, selectedTimezone,
       jobDescription, skill, minExp, maxExp, selectedDays} = jobPostingDto;
    
    const post = await this.jobPostingModel.create({
      title,
      application,
      location,
      status: Status.Active,
      accountId,
      salary,
      expectedSalary,
      jobDescription,
      skill,
      minExp,
      maxExp,
      jobType,
      timeAvailability,
      selectedTimezone,
      selectedDays,
      isActive: true,
      deletedAt: null
    });
    return post;
  }

  async findJobPostingById(id: string): Promise<any | null> {
    return this.jobPostingModel.findById(id).exec();

  }

  //   async getAllJobPost():  Promise<any>{
  //     return await this.jobPostingModel.find();

  //  }
  //  page: number = 1, limit: number = 10
  async getAllJobPost(page, limit): Promise<any> {
    const offset = page * limit;
    return await this.jobPostingModel.aggregate([
      {
        $facet: {
          count: [
            { $count: "totalcount" }
          ],
          listedJobs: [
            {
              $sort: { isActive: -1, createdAt: -1 }
            },
            {
              $skip: offset
            },
            {
              $limit: limit
            }
          ],
        },
      },
    ])
    // return await this.jobPostingModel.aggregate([
    //     {
    //       $sort:({"isActive": -1,"createdAt" : -1})
    //     },
    //     { 
    //       $count: "count"
    //     },
    //     {
    //       $project:{
    //         _id: 0,
    //         count:1
    //       }
    //     },
    //     {
    //       $facet: {
    //       "filteredUser":[
    //         {
    //           $skip: offset
    //         },
    //         {
    //           $limit : limit
    //         }
    //       ]
    //     }}

    //   ])    
  }

  async getTotalCount() {
    const totalCount = await this.jobPostingModel.countDocuments();
    return { totalCount };
  }

  async deActivatePostById(id: string): Promise<any | null> {
    const currentDate = new Date();
    const deActivate = "deActivate";
    return this.jobPostingModel.findByIdAndUpdate(id, { isActive: false, deletedAt: currentDate, status: deActivate }, { new: true }).exec();
  }

  async updateJobPostingById(id: string, updateUserDto: JobPostingDto): Promise<any | null> {
    const activate = "active";
    const date =  new Date();
    return this.jobPostingModel.findByIdAndUpdate(id, updateUserDto, { status: activate, new: true,updatedAt:date }).exec();
  }

}