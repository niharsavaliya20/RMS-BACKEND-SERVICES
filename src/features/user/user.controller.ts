import { Body, Controller, Delete, Get, Param, Put } from "@nestjs/common";
import { User } from "./user.schema";
import { UserService } from "./user.service";
import {  updateSignUpDto } from "src/Dto/updateSignUp.dto";


@Controller('user')
export class UserController {
  constructor(private userService: UserService) { }

  @Get('allUser')
  // @UseGuards(AuthGuard("jwt"))
  getAllSignUp(): Promise<User[]> {
    return this.userService.getAllSignUp();
  }

  @Get('get/:id')
  async findById(@Param('id') id: string): Promise<User[] | null> {
    return this.userService.findById(id);
  }

  @Get('employerProfile/all')
  async employerWithProfile(): Promise<User[] | null> {
    return this.userService.employerWithProfile();
  }

  @Get('employerProfile/:id')
  async employerProfileId(@Param('id') id: string): Promise<User[] | null> {
    return this.userService.employerProfileId(id);
  }

  @Get('get/:email')
  async findByEmail(@Param('email') email: string): Promise<User | null> {
    return this.userService.findByEmail(email);
  }

  @Get('employeeProfile/all')
  async employeeWithProfile(): Promise<User[] | null> {
    return this.userService.employeeWithProfile();
  }

  @Get('employeeProfile/:id')
  async employeeProfileId(@Param('id') id: string): Promise<User[] | null> {
    return this.userService.employeeProfileId(id);
  }

  @Put('delete/:id')  // deactive user
  async updateById(@Param('id') id: string): Promise<User | null> {
    return this.userService.updateById(id);
  }

  @Put('update/:id')
  async updateUserById(@Param('id') id: string, @Body() updateUserDto: updateSignUpDto): Promise<any | null> {
    return this.userService.updateUserById(id, updateUserDto);
  }
}