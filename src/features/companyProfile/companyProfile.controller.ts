import { Body, Controller, Get, Param, Post, Request, UseGuards } from "@nestjs/common";
import { CompanyProfileService } from "./companyProfile.service";
import { CompanyProfileDto } from "src/Dto/companyProfile.dto";
import { AuthGuard } from "@nestjs/passport";


@Controller('companyProfile')
export class CompanyProfileController {
    constructor(private companyProfileService: CompanyProfileService) { }

    @Post('/create')   // new create post
    @UseGuards(AuthGuard("jwt"))
    createCompanyProfile(@Body() companyProfileDto: CompanyProfileDto, @Request() req): Promise<any> {
        const accountId = req.user.accountId
        return this.companyProfileService.createCompanyProfile(companyProfileDto,accountId);
    }

    @Get('companyDetail/:accountId')
    @UseGuards(AuthGuard("jwt"))
    async findCompanyProfile(@Param('accountId') accountId: string): Promise<any | null> {
         return this.companyProfileService.findCompanyProfile(accountId)
    }

}