import { Controller, Get, Post, Body, UseGuards, Param, Delete, Put } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { EmployerProfileService } from "./employer.service";
// import { employerProfile } from "./employer.schema";
import { EmployerProfileDto } from "src/Dto/employerProfile.dto";

@Controller('employer')
export class EmployerProfileController {
    constructor(private profileService: EmployerProfileService) { }

    @Post('/create')   // new create post
    getDetail(@Body() profileUpDto: EmployerProfileDto): Promise<any> {
        return this.profileService.getDetail(profileUpDto);
    }

    @Get('get/:id')
    async findById(@Param('id') id: string): Promise<any | null> {
        return this.profileService.findById(id);
    }

    @Get('get/all')
    // @UseGuards(AuthGuard("jwt"))
    getAllProfiles(): Promise<any[]>{
        return this.profileService.getAllProfiles();
    }

    @Get('get/:designation')
    async findOne(@Param('designation') designation: string): Promise<any | null> {
      return this.profileService.findOne(designation);
    }

    @Delete('delete/:id')
    async deleteEmployerById(@Param('id') id: string): Promise<any | null> {
    return this.profileService.deleteEmployerById(id);
  }

  @Put('update/:id')
  async updateEmployerUserById(@Param('id') id: string, @Body() employerprofileDto: EmployerProfileDto): Promise<any | null> {
    return this.profileService.updateUserById(id, employerprofileDto);
  }

  @Put('update/profile/:userId')
  async updateEmployerProfileByUserId(@Param('userId') userId: string, @Body() employerprofileDto: EmployerProfileDto): Promise<any | null> {
    return this.profileService.updateUserEmployerProfileByUserId(userId, employerprofileDto);
  }
}