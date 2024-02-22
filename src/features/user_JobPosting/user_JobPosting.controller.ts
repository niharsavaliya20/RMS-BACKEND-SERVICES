import { Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Post, Put, Query, Request, UseGuards } from "@nestjs/common";
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

  @Get('/matchJobPostingId')
  @UseGuards(AuthGuard("jwt"))
  async findJobPostingId(@Request() req): Promise<any | null> {
    const userId: string = req.user._id
    return this.userJobPostingService.findJobPostingId(userId);
  }

  @Get('/applicatns/:jobPostingId')
  @UseGuards(AuthGuard("jwt"))
  async allApplicatns(@Request() req, @Query('applicantStatus') applicantStatus: number, @Param('jobPostingId') jobPostingId: string): Promise<any | null> {

    const Id: string = req.user.accountId
    if (applicantStatus) {
      return this.userJobPostingService.findAllApplicants(Id, applicantStatus, jobPostingId);
    }
    return {
      code: HttpStatus.BAD_REQUEST,
      message: "applicantStatus is require"
    }

  }

  @Patch('approveApplicant/:id')
  @UseGuards(AuthGuard("jwt"))
  async updateApproveAppliedJobPostStatus(@Param('id') id: string, @Body('statusId') statusId: number): Promise<any | null> {

    try {

      // Check for valid statusId or handle validation in the service method
      if (!id || statusId === undefined || isNaN(statusId) || statusId < 0) {
        // throw new Error('Invalid statusId provided');
        throw new HttpException('Invalid parameters provided', HttpStatus.BAD_REQUEST);
      }

      return this.userJobPostingService.updateAppliedJobPostStatus(id, statusId);
    } catch (error) {

      console.error('Error updating applicant status:', error.message);

      if (error instanceof HttpException) {
        throw error; // If it's already an HttpException, rethrow it with the appropriate status code
      } else {
        // If it's not an HttpException, create a new one with a generic error message and status code
        throw new HttpException('Failed to update applicant status', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  @Get('/applicantDetail/:id')
  @UseGuards(AuthGuard("jwt"))
  async applicantDetail(@Param('id') id: string): Promise<any | null> {
    return this.userJobPostingService.applicantDetail(id);
  }

} 