import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from 'src/Dto/signup.dto';
import { LoginDto } from 'src/Dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/features/user/user.schema';
import mongoose from 'mongoose';
mongoose.set('debug', true);   //for showing log


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() signUpDto: SignUpDto): Promise<User> {
    return this.authService.signUp(signUpDto);
  }

  @Post('/login')
  login(@Body() loginDto: LoginDto): Promise<{id:string, token: string , roles : string[], emails : string, accountId:{}}> {
    return this.authService.login(loginDto);
  }
  

  @Post('/oauthLogin')
  googleLogin(@Body() loginDto: LoginDto): Promise< User | {id:string,token: string}> {
     return this.authService.googleLogin(loginDto);
  }

  @Get('/home')
  @UseGuards(AuthGuard("jwt"))
  home(): string { 
    return "this is home";
  }
}