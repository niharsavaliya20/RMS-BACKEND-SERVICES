import { Body, Controller, Delete, Get, Param, ParseIntPipe, Put, Query } from "@nestjs/common";
// import { User } from "./user.schema";
import { UserService } from "./user.service";
import {  updateSignUpDto } from "src/Dto/updateSignUp.dto";
import { UserInterface } from "src/Dto/interfaces/user.interface";
import { User } from "./user.schema";


@Controller('user')
export class UserController {
  constructor(private userService: UserService) { }

  @Get('allUserEmployee')
  // @UseGuards(AuthGuard("jwt"))
  getAllEmployeeUser(): Promise<any> {
    return this.userService.getAllEmployeeUser();
  }

  @Get('allUserEmployer')
  // @UseGuards(AuthGuard("jwt"))
  getAllEmployerUser(): Promise<any> {
    return this.userService.getAllEmployerUser();
  }

  @Get('get/:id')
  async findUserById(@Param('id') id: string): Promise<any| null> {
    return this.userService.findUserById(id);
  }

  @Get('employerProfile/all')
  async usersWithEmployerProfile(@Query('page') page: number = 1,
  @Query('limit', ParseIntPipe) limit: number = 10,): Promise<User[] | null> {
    return this.userService.usersWithEmployerProfile(page,limit);
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
  async usersWithEmployeeWithProfile(@Query('page') page: number = 1,
  @Query('limit', ParseIntPipe) limit: number = 10,): Promise<User[] | null> {
    return this.userService.usersWithEmployeeWithProfile(page,limit);
  }

  @Get('employeeProfile/:id')
  async userEmployeeProfileId(@Param('id') id: string): Promise<any | null> {
    return this.userService.userEmployeeProfileId(id);
  }

  @Put('deActivate/:id')  // deactive user
  async deActivateUserById(@Param('id') id: string,@Query('status') status:boolean): Promise<any | null> {
    return this.userService.deActivateUserById(id,status);
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