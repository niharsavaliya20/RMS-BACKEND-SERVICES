import { Body, Controller, Get, Param, Post, Put, Request, UseGuards } from "@nestjs/common";
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
  async allApplicatns(@Request() req): Promise<any | null> {
    const Id: string = req.user.accountId
     return this.userJobPostingService.findAllApplicants(Id);
  }

  @Get('/getApprovedApplicants')
  @UseGuards(AuthGuard("jwt"))
  async getApprovedApplicatns(@Request() req): Promise<any | null> {
    const Id: string = req.user.accountId
     return this.userJobPostingService.getApprovedApplicants(Id);
  }

  @Get('/getRejectedApplicants')
  @UseGuards(AuthGuard("jwt"))
  async getRejectedApplicatns(@Request() req): Promise<any | null> {
    const Id: string = req.user.accountId
     return this.userJobPostingService.getRejectedApplicants(Id);
  }

  @Put('rejectApplicant/:id')
  async updateRejectAppliedJobPostStatus(@Param('id') id: string): Promise<any | null> {
    return this.userJobPostingService.updateRejectAppliedJobPostStatus(id);
  }

  @Put('approveApplicant/:id')
  async updateApproveAppliedJobPostStatus(@Param('id') id: string): Promise<any | null> {
    return this.userJobPostingService.updateAppliedJobPostStatus(id);
  }

} 