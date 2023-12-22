import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { AccountService } from "./account.service";
import { AccountDto } from "src/Dto/account.dto";

@Controller('account')
export class AccountController {
    constructor(private accountService: AccountService) { }

    @Post('/create')   // new create post
    createAccount(@Body() accountDto: AccountDto): Promise<any> {
        return this.accountService.createAccount(accountDto);
    }

    @Get('get/:id')
    async findAccountById(@Param('id') id: string): Promise<any | null> {
        return this.accountService.findAccountById(id);
    }

    @Put('delete/:id')  // deactive user
    async deActivateAccountById(@Param('id') id: string): Promise<any | null> {
        return this.accountService.deActivateAccountById(id);
    }

    @Put('update/:id')
    async updateAccountgById(@Param('id') id: string, @Body() accountDto: AccountDto): Promise<any | null> {
        return this.accountService.updateAccountById(id, accountDto);
    }

}