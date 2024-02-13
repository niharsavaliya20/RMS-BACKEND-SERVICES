import { Body, Controller, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { AccountService } from "./account.service";
import { AccountDto } from "src/Dto/account.dto";
import { AuthGuard } from "@nestjs/passport";

@Controller('account')
export class AccountController {
    constructor(private accountService: AccountService) { }

    @Post('/create')   // new create post
    createAccount(@Body() accountDto: AccountDto): Promise<any> {
        return this.accountService.createAccount(accountDto);
    }

    @Get('get/:id')
    @UseGuards(AuthGuard("jwt"))
    async findAccountById(@Param('id') id: string): Promise<any | null> {
        return this.accountService.findAccountById(id)
    }

    @Get('post/all')
    @UseGuards(AuthGuard("jwt"))
    async getAllJobPost(): Promise<any> {
    return this.accountService.getAllJobPost();
  }

    @Put('delete/:id')  // deactive user
    @UseGuards(AuthGuard("jwt"))
    async deActivateAccountById(@Param('id') id: string): Promise<any | null> {
        return this.accountService.deActivateAccountById(id);
    }

    @Put('update/:id')
    @UseGuards(AuthGuard("jwt"))
    async updateAccountgById(@Param('id') id: string, @Body() accountDto: AccountDto): Promise<any | null> {
        return this.accountService.updateAccountById(id, accountDto);
    }

}