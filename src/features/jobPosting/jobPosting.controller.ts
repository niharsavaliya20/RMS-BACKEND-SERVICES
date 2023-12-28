import { Controller, Get, Post, Body, UseGuards, Param, Delete, Put } from "@nestjs/common";
import { JobPostingService } from "./jobPosting.service";
import { JobPostingDto } from "src/Dto/jobPosting.dto";


@Controller('jobposting')
export class JobPostingController {
  constructor(private jobPostingService: JobPostingService) { }

  @Post('/create')   // new create post
  jobPost(@Body() jobPostingDto: JobPostingDto): Promise<any> {
    return this.jobPostingService.jobPost(jobPostingDto);
  }

  @Get('get/:id')
  async findJobPostingById(@Param('id') id: string): Promise<any | null> {
    return this.jobPostingService.findJobPostingById(id);
  }

  @Get('post/all')
  async getAllJobPost(): Promise<any> {
    return this.jobPostingService.getAllJobPost();
  }

  @Put('delete/:id')  // deactive user
  async deActivatePostById(@Param('id') id: string): Promise<any | null> {
    return this.jobPostingService.deActivatePostById(id);
  }

  @Put('update/:id')
  async updateJobPostingById(@Param('id') id: string, @Body() updateUserDto: JobPostingDto): Promise<any | null> {
    return this.jobPostingService.updateJobPostingById(id, updateUserDto);
  }

}