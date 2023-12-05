import { Injectable, UnauthorizedException } from "@nestjs/common";
import { User } from "src/user/user.schema";
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { SignUpDto } from "src/Dto/signup.dto";
import { LoginDto } from "src/Dto/login.dto";
import { LoginType } from "src/constants/enum";

@Injectable()
export class AuthService {

  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) { }

  async signUp(signUpDto: SignUpDto): Promise<User> {
    const { name, email, password,loginType,/* roles*/ }= signUpDto;

    const user = await this.userModel.create({
      name,
      email,
      password,
      loginType : LoginType.System,
      // roles,
    });

    return user;
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto;

    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    if (password != user.password) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = this.jwtService.sign({ id: user._id, email: user.email });

    return { token };
  }

  async googleLogin( loginDto: LoginDto): Promise<User | {token : string} > {
     const { name,email, password, loginType} = loginDto;

    const user = await this.userModel.findOne({ email });

    if (!user) {

      const user2 = await this.userModel.create({
         name,
        email,
        password,
        loginType : LoginType.Google
      });

      return user2;

    }

    if (email != user.email) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = this.jwtService.sign({ id: user._id, email: user.email });

    return { token };
  }
}