import { Body, Controller, Get, Param, Patch, Post, Put, Query, Request, UseGuards } from "@nestjs/common";
import { UserJobPostingService } from "./user_JobPosting.service";
import { UserJobPostingDto } from "src/Dto/user_JobPosting.Dto";
import { AuthGuard } from "@nestjs/passport";
import { JobPosting } from "../jobPosting/jobPosting.schema";

@Controller('userJobList')
export class UserJobPostingController {
  constructor(private userJobPostingService: UserJobPostingService) { }

  @Post('/apply')   // new create post
  @UseGuards(AuthGuard("jwt"))
  appliedJobPost(@Body() userJobPostingDto: UserJobPostingDto, @Request() req): Promise<any> {
    const Id: string = req.user._id
    return this.userJobPostingService.appliedJobPost(userJobPostingDto, Id);
  }

  // @Get('/appliedJob')
  // @UseGuards(AuthGuard("jwt"))
  // async findJobPosting(@Body() jobPostingId,@Request() req): Promise<any | null> {
  //   const userId:string = req.user._id
  //   return this.userJobPostingService.findJobPosting(jobPostingId.jobPostingId,userId);
  // }

  @Get('/matchJobPostingId')
  @UseGuards(AuthGuard("jwt"))
  async findJobPostingId(@Request() req): Promise<any | null> {
    const userId: string = req.user._id
    return this.userJobPostingService.findJobPostingId(userId);
  }

  @Get('/applicatns/:jobPostingId')
  @UseGuards(AuthGuard("jwt"))
  async allApplicatns(@Request() req , @Query('applicantStatus') applicantStatus : number,@Param('jobPostingId') jobPostingId: string ): Promise<any | null> {
    const Id: string = req.user.accountId
    console.log("parammmmmmmmmmmmmmm ",applicantStatus);
    console.log("gggggggggggggggggggggg",jobPostingId)
     return this.userJobPostingService.findAllApplicants(Id, applicantStatus,jobPostingId);
  }

  // @Patch('rejectApplicant/:id')
  // async updateRejectAppliedJobPostStatus(@Param('id') id: string, @Query('statusId') statusId : number): Promise<any | null> {
  //   return this.userJobPostingService.updateRejectAppliedJobPostStatus(id, statusId);
  // }

  @Patch('approveApplicant/:id')
  async updateApproveAppliedJobPostStatus(@Param('id') id: string,@Body('statusId') statusId : number): Promise<any | null> {
    console.log("approvvvvvvvvvvvvvvvvvvvvvvvv",statusId)
    return this.userJobPostingService.updateAppliedJobPostStatus(id,statusId);
  }

  // @Patch('OnHoldApplicant/:id')
  // async updateOnHoldAppliedJobPostStatus(@Param('id') id: string, @Query('statusId') statusId : number = 3): Promise<any | null> {
  //   console.log("apliStatusssssssssss",statusId)
  //   return this.userJobPostingService.updateOnHoldAppliedJobPostStatus(id,statusId);
  // }

  @Get('/applicantDetail/:id')
  // @UseGuards(AuthGuard("jwt"))
  async applicantDetail(@Param('id') id : string ): Promise<any | null> {
    // const Id: string = req.user.accountId
    // console.log("parammmmmmmmmmmmmmm ",applicantStatus);
     return this.userJobPostingService.applicantDetail(id);
  }

} 