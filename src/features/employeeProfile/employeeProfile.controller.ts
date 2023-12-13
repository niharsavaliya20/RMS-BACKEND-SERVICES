import { Controller, Get, Post, Body, UseGuards, Param, Delete } from "@nestjs/common";
import { EmployeeProfileService } from "./employeeProfile.service";
import { AuthGuard } from "@nestjs/passport";
import { employeeProfile } from "./employeeProfile.schema";
import { EmployeeProfileDto } from "src/Dto/employeeProfile.dto";

@Controller('employee')
export class EmployeeProfileController {
    constructor(private profileService: EmployeeProfileService) { }

    @Post('/create')    // new create post
    getDetail(@Body() profileUpDto: EmployeeProfileDto): Promise<employeeProfile> {
        return this.profileService.getDetail(profileUpDto);
    }

    @Get('get/:id')
    async findById(@Param('id') id: string): Promise<employeeProfile | null> {
        return this.profileService.findById(id);
    }

    @Get('get/all')
    @UseGuards(AuthGuard("jwt"))
    getAllProfiles(): Promise<employeeProfile[]> {
        return this.profileService.getAllProfiles();
    }

    @Get('get/:experience')
    async findOne(@Param('experience') experience: string): Promise<employeeProfile | null> {
        return this.profileService.findOne(experience);
    }

    @Delete('delete/:id')
    async deleteEmployeeById(@Param('id') id: string): Promise<employeeProfile | null> {
        return this.profileService.deleteEmployeeById(id);
    }
}