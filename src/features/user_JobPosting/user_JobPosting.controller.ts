import { Body, Controller, Post } from "@nestjs/common";
import { UserJobPostingService } from "./user_JobPosting.service";
import { userJobPostingDto } from "src/Dto/user_JobPosting.Dto";

@Controller('userJobList')
export class UserJobPostingController{  
    constructor(private userJobPostingService: UserJobPostingService) { }

  @Post('/apply')   // new create post
  appliedJobPost(@Body() userJobPostingDto: userJobPostingDto): Promise<any> {
    return this.userJobPostingService.appliedJobPost(userJobPostingDto);
  }

} 