import { Controller, Get, UseGuards , Request} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';

@Controller("app")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  getHello(): string {
    return "hghvhvjhv gfgh"; 
  }
}
