import { Controller, Get, Post, Body, UseGuards, Param, Delete, Put } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { EmployerProfileService } from "./employer.service";
// import { employerProfile } from "./employer.schema";
import { EmployerProfileDto } from "src/Dto/employerProfile.dto";

@Controller('employer')
export class EmployerProfileController {
    constructor(private profileService: EmployerProfileService) { }

    @Post('/create')   // new create post
    @UseGuards(AuthGuard("jwt"))
    getDetail(@Body() profileUpDto: EmployerProfileDto): Promise<any> {
        return this.profileService.getDetail(profileUpDto);
    }

    @Get('get/:id')
    @UseGuards(AuthGuard("jwt"))
    async findById(@Param('id') id: string): Promise<any | null> {
        return this.profileService.findById(id);
    }

    @Get('get/all')
    @UseGuards(AuthGuard("jwt"))
    getAllProfiles(): Promise<any[]>{
        return this.profileService.getAllProfiles();
    }

    @Get('get/:designation')
    @UseGuards(AuthGuard("jwt"))
    async findOne(@Param('designation') designation: string): Promise<any | null> {
      return this.profileService.findOne(designation);
    }

    @Delete('delete/:id')
    @UseGuards(AuthGuard("jwt"))
    async deleteEmployerById(@Param('id') id: string): Promise<any | null> {
    return this.profileService.deleteEmployerById(id);
  }

  @Put('update/:id')
  @UseGuards(AuthGuard("jwt"))
  async updateEmployerUserById(@Param('id') id: string, @Body() employerprofileDto: EmployerProfileDto): Promise<any | null> {
    return this.profileService.updateUserById(id, employerprofileDto);
  }

  @Put('update/profile/:userId')
  @UseGuards(AuthGuard("jwt"))
  async updateEmployerProfileByUserId(@Param('userId') userId: string, @Body() employerprofileDto: EmployerProfileDto): Promise<any | null> {
    return this.profileService.updateUserEmployerProfileByUserId(userId, employerprofileDto);
  }
}