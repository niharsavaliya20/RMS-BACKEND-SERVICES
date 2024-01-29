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
        // const username = (req.user as UserInterface).name;
        const userId = (req.user as UserInterface)._id;
        const uploadPath = `./uploads/${userId}`;
        if (!fs.existsSync(uploadPath)) {
          fs.mkdirSync(uploadPath, { recursive: true });
        }
        callback(null, `${uploadPath}`);
        console.log("..........",req.user);
        console.log("file name...",file)
      },
      filename: (req, file, callback) => {
        const userId = (req.user as UserInterface)._id;
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

  // const originalname = file.originalname;
  // const prefixedFilename = `${originalname}`;

  // @Post('/create')
  // @UseGuards(AuthGuard("jwt"))
  // @UseInterceptors(FileInterceptor( 'file',{
  //     storage: diskStorage({
  //         destination: './uploads', // Set the destination folder for uploaded images
  //         filename: (req, file, callback) => {
  //              console.log("req.???????.....",(req.user as UserInterface).name)
  //             callback(null, `${file.originalname}`);
  //         },
  //     }),
  // }))
  // createEmployeeProfile(@Request() req, @Body() employeeprofileDto: EmployeeProfileDto, @UploadedFile() file: Express.Multer.File): Promise<employeeProfile> {
  //     const Id: string = req.user._id;
  //     employeeprofileDto.profilePicture = file.originalname;
  //     console.log("......",file.originalname)
  //     return this.profileService.createEmployeeProfile(employeeprofileDto, Id);
  // }

  //    async uploadFile(@UploadedFile() file: Express.Multer.File){
  //     console.log(" in upload file......",file)

  //   }


  // @Post('/create')    // new create post
  // @UseGuards(AuthGuard("jwt"))
  // createEmployeeProfile(@Request() req,@Body() employeeprofileDto: EmployeeProfileDto): Promise<employeeProfile> {
  //     const Id: string = req.user._id
  //     return this.profileService.createEmployeeProfile(employeeprofileDto,Id);
  // }

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

  @Put('update/profile/:userId')
  async updateEmployeeProfileByUserId(@Param('userId') userId: string, @Body() employeeprofileDto: EmployeeProfileDto): Promise<any | null> {
    return this.profileService.updateUserEmployeeProfileByUserId(userId, employeeprofileDto);
  }
}