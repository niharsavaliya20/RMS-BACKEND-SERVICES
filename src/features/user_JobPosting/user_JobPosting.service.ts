import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserJobPosting } from "./user_JobPosting.schema";
import { userJobPostingDto } from "src/Dto/user_JobPosting.Dto";
import { Status } from "src/constants/status";

@Injectable()
export class UserJobPostingService {

   constructor(@InjectModel('user_JobPosting')
   private UserjobPostingModel: Model<UserJobPosting>){}
   
   async appliedJobPost(userJobPostingDto: userJobPostingDto): Promise<any> {
  
    const {userId,jobPostingId,status,applied } = userJobPostingDto;
    
    const post = await this.UserjobPostingModel.create({
      userId,
      jobPostingId,
      status: Status.Active,
      applied : true,
    });
    return post;
  }

}
