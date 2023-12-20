import { Body, Controller, Delete, Get, Param, Put } from "@nestjs/common";
// import { User } from "./user.schema";
import { UserService } from "./user.service";
import {  updateSignUpDto } from "src/Dto/updateSignUp.dto";
import { UserInterface } from "src/Dto/interfaces/user.interface";
import { User } from "./user.schema";


@Controller('user')
export class UserController {
  constructor(private userService: UserService) { }

  @Get('allUser')
  // @UseGuards(AuthGuard("jwt"))
  getAllSignUp(): Promise<any> {
    return this.userService.getAllSignUp();
  }

  @Get('get/:id')
  async findUserById(@Param('id') id: string): Promise<any| null> {
    return this.userService.findUserById(id);
  }

  @Get('employerProfile/all')
  async usersWithEmployerProfile(): Promise<User[] | null> {
    return this.userService.usersWithEmployerProfile();
  }

  @Get('employerProfile/:id')
  async userEmployerProfileId(@Param('id') id: string): Promise<any| null> {
    return this.userService.userEmployerProfileId(id);
  }

  @Get('getUser/:email')
  async findUserByEmail(@Param('email') email: string): Promise<any | null> {
    return this.userService.findUserByEmail(email);
  }

  @Get('employeeProfile/all')
  async usersWithEmployeeWithProfile(): Promise<User[] | null> {
    return this.userService.usersWithEmployeeWithProfile();
  }

  @Get('employeeProfile/:id')
  async userEmployeeProfileId(@Param('id') id: string): Promise<any | null> {
    return this.userService.userEmployeeProfileId(id);
  }

  @Put('delete/:id')  // deactive user
  async deActivateUserById(@Param('id') id: string): Promise<any | null> {
    return this.userService.deActivateUserById(id);
  }

  @Put('update/:id')
  async updateUserById(@Param('id') id: string, @Body() updateUserDto: updateSignUpDto): Promise<any | null> {
    return this.userService.updateUserById(id, updateUserDto);
  }

  @Put('update/userProfile/:id')
  async updateUserProfileById(@Param('id') id: string, @Body() updateUserDto: UserInterface): Promise<any | null> {
    return this.userService.updateUserProfileById(id, updateUserDto);
  }
}