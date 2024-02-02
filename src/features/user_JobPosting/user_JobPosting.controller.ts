import { Body, Controller, Get, Param, Post, Put, Query, Request, UseGuards } from "@nestjs/common";
import { UserJobPostingService } from "./user_JobPosting.service";
import { UserJobPostingDto } from "src/Dto/user_JobPosting.Dto";
import { AuthGuard } from "@nestjs/passport";

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

  @Get('/applicatns')
  @UseGuards(AuthGuard("jwt"))
  async allApplicatns(@Request() req , @Query('applicantStatus') applicantStatus : string ): Promise<any | null> {
    const Id: string = req.user.accountId
    console.log("parammmmmmmmmmmmmmm ",applicantStatus);
     return this.userJobPostingService.findAllApplicants(Id, applicantStatus);
  }

  @Put('rejectApplicant/:id')
  async updateRejectAppliedJobPostStatus(@Param('id') id: string): Promise<any | null> {
    return this.userJobPostingService.updateRejectAppliedJobPostStatus(id);
  }

  @Put('approveApplicant/:id')
  async updateApproveAppliedJobPostStatus(@Param('id') id: string): Promise<any | null> {
    return this.userJobPostingService.updateAppliedJobPostStatus(id);
  }

  @Get('/applicantDetail/:id')
  // @UseGuards(AuthGuard("jwt"))
  async applicantDetail(@Param('id') id : string ): Promise<any | null> {
    // const Id: string = req.user.accountId
    // console.log("parammmmmmmmmmmmmmm ",applicantStatus);
     return this.userJobPostingService.applicantDetail(id);
  }

} 