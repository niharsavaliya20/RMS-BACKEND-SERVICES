import { Controller, Get, Post, Body, UseGuards, Param } from "@nestjs/common";
import { SignUpDto } from "src/Dto/signup.dto";
import { User } from "./user.schema";
import { UserService } from "./user.servise";


@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @Get('all')
    // @UseGuards(AuthGuard("jwt"))
    getAllSignUp(): Promise<User[]>{
        return this.userService.getAllSignUp();
    }

    @Get('userWithProfile')
    async findUserWithProfile(): Promise<User[] | null> {
      return this.userService.findUserWithProfile();
    }

    @Get('email/:email')
    async findByEmail(@Param('email') email: string): Promise<User | null> {
      return this.userService.findByEmail(email);
    }
}