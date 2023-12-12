import { Controller, Get, Post, Body, UseGuards, Param } from "@nestjs/common";
import { ProfileDto } from "src/Dto/profile.dto";
import { ProfileService } from "./profile.service";
import { AuthGuard } from "@nestjs/passport";
import { Profile } from "./profile.schema";

@Controller('profile')
export class ProfileController {
    constructor(private profileService: ProfileService) { }

    @Post('/detail')
    getDetail(@Body() profileUpDto: ProfileDto): Promise<Profile> {
        return this.profileService.getDetail(profileUpDto);
    }

    @Get('all')
    @UseGuards(AuthGuard("jwt"))
    getAllProfiles(): Promise<Profile[]>{
        return this.profileService.getAllProfiles();
    }

    @Get(':experience')
    async findOne(@Param('experience') experience: string): Promise<Profile | null> {
      return this.profileService.findOne(experience);
    }
}