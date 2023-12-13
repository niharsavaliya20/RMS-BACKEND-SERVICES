import { Controller, Get, Post, Body, UseGuards, Param, Delete } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { EmployerProfileService } from "./employer.service";
import { employerProfile } from "./employer.schema";
import { EmployerProfileDto } from "src/Dto/employer.dto";

@Controller('employer')
export class EmployerProfileController {
    constructor(private profileService: EmployerProfileService) { }

    @Post('/create')   // new create post
    getDetail(@Body() profileUpDto: EmployerProfileDto): Promise<employerProfile> {
        return this.profileService.getDetail(profileUpDto);
    }

    @Get('get/:id')
    async findById(@Param('id') id: string): Promise<employerProfile | null> {
        return this.profileService.findById(id);
    }

    @Get('get/all')
    // @UseGuards(AuthGuard("jwt"))
    getAllProfiles(): Promise<employerProfile[]>{
        return this.profileService.getAllProfiles();
    }

    @Get('get/:designation')
    async findOne(@Param('designation') designation: string): Promise<employerProfile | null> {
      return this.profileService.findOne(designation);
    }

    @Delete('delete/:id')
    async deleteEmployerById(@Param('id') id: string): Promise<employerProfile | null> {
    return this.profileService.deleteEmployerById(id);
  }
}