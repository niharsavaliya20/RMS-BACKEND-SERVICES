import { Controller, Get, Post, Body, UseGuards, Param, Delete, Put, Query, ParseIntPipe, Headers, Request } from "@nestjs/common";
import { JobPostingService } from "./jobPosting.service";
import { JobPostingDto } from "src/Dto/jobPosting.dto";
import { AuthGuard } from "@nestjs/passport";

@Controller('jobposting')
export class JobPostingController {
  constructor(private jobPostingService: JobPostingService) { }

  @Post('/create')   // new create post
  @UseGuards(AuthGuard("jwt"))
  jobPost(@Body() jobPostingDto: JobPostingDto,@Request() req): Promise<any> {
    
    const Id:string = req.user.accountId
    return this.jobPostingService.jobPost(jobPostingDto,Id);
  }

  @Get('get/:id')
  async findJobPostingById(@Param('id') id: string): Promise<any | null> {
    
    return this.jobPostingService.findJobPostingById(id);
  }

  @Get('post/all')
  @UseGuards(AuthGuard("jwt"))
  async getAllJobPost(@Query('page') page: number = 1,
  @Query('limit', ParseIntPipe) limit: number = 10,@Request() req): Promise<any> {
    const accountId = req.user.accountId
    return this.jobPostingService.getAllJobPost(page,limit,accountId);
  }

  @Get('jobList/all')
  // @UseGuards(AuthGuard("jwt"))
  async getAllJobList(@Query('page') page: number = 1,
  @Query('limit', ParseIntPipe) limit: number = 10,): Promise<any> {
    return this.jobPostingService.getAllJobList(page,limit);
  }

  @Get('total')
  async getTotalCount() {
    const totalCount = await this.jobPostingService.getTotalCount();
    return totalCount;
  }


  @Put('delete/:id')  // deactive user
  async deActivatePostById(@Param('id') id: string): Promise<any | null> {
    return this.jobPostingService.deActivatePostById(id);
  }

  @Put('update/:id')
  async updateJobPostingById(@Param('id') id: string, @Body() updateUserDto: JobPostingDto): Promise<any | null> {
    return this.jobPostingService.updateJobPostingById(id, updateUserDto);
  }

  @Get('getJobListBYAccountId')
  @UseGuards(AuthGuard("jwt"))
  async getJobListBYAccountId(@Request() req) {
    const accountId = req.user.accountId
    const totalCount = await this.jobPostingService.getJobListBYAccountId(accountId);
    return totalCount;
  }

}