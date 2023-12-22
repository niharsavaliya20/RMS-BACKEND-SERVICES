import { Injectable, UnauthorizedException } from "@nestjs/common";
import { User } from "src/features/user/user.schema";
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { SignUpDto } from "src/Dto/signup.dto";
import { LoginDto } from "src/Dto/login.dto";
import { LoginType } from "src/constants/enum";
import { Roles } from "src/constants/roles";

@Injectable()
export class AuthService {

  constructor(
    @InjectModel('user')
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) { }

  async signUp(signUpDto: SignUpDto): Promise<User> {
    const { name, email, password,loginType ,roles,accountId}= signUpDto;

    const user = await this.userModel.create({
      name,
      email,
      password,
      loginType : LoginType.System,
      roles,
      accountId,
      isActive: true,
      deletedAt:null
    });

    return user;
  }

  async login(loginDto: LoginDto): Promise<{ id:string, token: string , roles : string[], emails : string}> {
    const { email, password } = loginDto;

    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    if (password != user.password) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = this.jwtService.sign({ id: user._id, email: user.email , roles: user.roles});
    const id = user.id;
    const roles = user.roles;
    const emails = user.email;
    return { id ,token, roles, emails};
  }

  async googleLogin( loginDto: any): Promise<User | {id:string,token : string} > {
     const { name,email, password, loginType,roles} = loginDto;

    const user = await this.userModel.findOne({ email });

    if (!user) {

      const goggleuser = await this.userModel.create({
        name,
        email,
        password,
        loginType : LoginType.Google,
        roles : Roles.EMPLOYEE,
        isActive: true
      });

      return goggleuser;

    }

    if (email != user.email) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = this.jwtService.sign({ id: user._id, email: user.email, roles: user.roles });
    const id = user.id;
   
    return { token ,id };
  }
}