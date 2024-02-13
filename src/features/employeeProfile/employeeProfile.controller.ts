import { Controller, Get, Post, Body, UseGuards, Param, Delete, Put, Request, UseInterceptors, UploadedFile } from "@nestjs/common";
import { EmployeeProfileService } from "./employeeProfile.service";
import { AuthGuard } from "@nestjs/passport";
import { employeeProfile } from "./employeeProfile.schema";
import { EmployeeProfileDto } from "src/Dto/employeeProfile.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { request } from "http";
import * as fs from 'fs';

interface UserInterface {
  _id: string,
  name: string,
  email: string,
  password: String,
  loginType: String,
  role: [],
  profile: [],
  //  profile: Profile
}

@Controller('employee')
export class EmployeeProfileController {
  constructor(private profileService: EmployeeProfileService) { }

  @Post('/create')
  @UseGuards(AuthGuard("jwt"))
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: (req, file, callback) => {

        const userId = (req.user as UserInterface)._id;    // @ get req _id from user
        const uploadPath = `./uploads/${userId}`;
        if (!fs.existsSync(uploadPath)) {
          fs.mkdirSync(uploadPath, { recursive: true });
        }
        callback(null, `${uploadPath}`);
      },
      filename: (req, file, callback) => {
        callback(null, `${file.originalname}`);
      },
    }),
  }))
  async createEmployeeProfile(
    @Request() req,
    @Body() employeeprofileDto: EmployeeProfileDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<employeeProfile> {
    const userId: string = req.user._id;

    employeeprofileDto.profilePicture = `${file.filename}`;
    console.log("......console", employeeprofileDto.profilePicture);
    return this.profileService.createEmployeeProfile(employeeprofileDto, userId);
  }

  @Get('get/:id')
  @UseGuards(AuthGuard("jwt"))
  async findById(@Param('id') id: string): Promise<employeeProfile | null> {
    return this.profileService.findById(id);
  }

  @Get('get/all')
  @UseGuards(AuthGuard("jwt"))
  getAllProfiles(): Promise<employeeProfile[]> {
    return this.profileService.getAllProfiles();
  }

  @Get('get/:experience')
  @UseGuards(AuthGuard("jwt"))
  async findOne(@Param('experience') experience: string): Promise<employeeProfile | null> {
    return this.profileService.findOne(experience);
  }

  @Delete('delete/:id')
  @UseGuards(AuthGuard("jwt"))
  async deleteEmployeeById(@Param('id') id: string): Promise<employeeProfile | null> {
    return this.profileService.deleteEmployeeById(id);
  }

  @Put('update/profile/:userId')
  @UseGuards(AuthGuard("jwt"))
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: (req, file, callback) => {

        const userId = (req.user as UserInterface)._id;    // @ get req _id from user
        const uploadPath = `./uploads/${userId}`;

        if (!fs.existsSync(uploadPath)) {
          fs.mkdirSync(uploadPath, { recursive: true });
        }

        callback(null, `${uploadPath}`);
      },
      filename: (req, file, callback) => {
        callback(null, `${file.originalname}`);
      },
    }),
  }))
  async updateEmployeeProfileByUserId(@Param('userId') userId: string,
    @Body() employeeprofileDto: EmployeeProfileDto,
    @UploadedFile() file: Express.Multer.File): Promise<any | null> {
    const existingProfile = await this.profileService.getUserEmployeeProfileByUserId(userId);

    const oldFilePath = `./uploads/${userId}/${existingProfile.profilePicture}`  // all file path

    if (file) {

      const allfile = fs.existsSync(oldFilePath)  // get true or false
      console.log("all files .............???", allfile)

      if (fs.existsSync(oldFilePath)) {
        console.log()
        fs.unlinkSync(oldFilePath);
      }

      employeeprofileDto.profilePicture = `${file.filename}`;
    }

    return this.profileService.updateUserEmployeeProfileByUserId(userId, employeeprofileDto);
  }
}
