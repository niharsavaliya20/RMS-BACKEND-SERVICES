import { Body, Controller, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Query, Request, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { CompanyProfileService } from "./companyProfile.service";
import { CompanyProfileDto } from "src/Dto/companyProfile.dto";
import { AuthGuard } from "@nestjs/passport";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import * as fs from 'fs';
import { CompanyProfile } from "src/Dto/interfaces/companyProfile.Interface";

@Controller('companyProfile')
export class CompanyProfileController {
    constructor(private companyProfileService: CompanyProfileService) { }

    @Post('/create')   // new create post
    @UseGuards(AuthGuard("jwt"))
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: (req, file, callback) => {

                const accountId = (req.user as CompanyProfile).accountId;    // @ get req _id from user
                const uploadPath = `./companyProfilePicture/${accountId}`;
                if (!fs.existsSync(uploadPath)) {
                    fs.mkdirSync(uploadPath, { recursive: true });
                }
                callback(null, `${uploadPath}`);
            },
            filename: (req, file, callback) => {
                callback(null, `${file.originalname}`);
            },
        }),
    }))
    createCompanyProfile(@Body() companyProfileDto: CompanyProfileDto,
        @Request() req,
        @UploadedFile() file: Express.Multer.File,): Promise<any> {
        const accountId = req.user.accountId
        companyProfileDto.profilePicture = `${file.filename}`;
        return this.companyProfileService.createCompanyProfile(companyProfileDto, accountId);
    }

    @Get('companyDetail/:accountId')
    @UseGuards(AuthGuard("jwt"))
    async findCompanyProfile(@Param('accountId') accountId: string): Promise<any | null> {
        if (accountId) {
            return this.companyProfileService.findCompanyProfile(accountId)
        }

    }

    @Get('getEmployerCompanyProfile')
    @UseGuards(AuthGuard("jwt"))
    async getEmployerCompanyProfile(@Request() req): Promise<any | null> {
        const accountId: string = req.user.accountId
        return this.companyProfileService.getEmployerCompanyProfile(accountId)
    }

    @Get('companyDetailById/:id')
    @UseGuards(AuthGuard("jwt"))
    async findCompanyProfileById(@Param('id') id: string): Promise<any | null> {
        return this.companyProfileService.findCompanyProfileById(id)
    }

    @Put('updateCompanyProfile')
    @UseGuards(AuthGuard("jwt"))
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: (req, file, callback) => {

                const accountId = (req.user as CompanyProfile).accountId;    // @ get req _id from user
                const uploadPath = `./companyProfilePicture/${accountId}`;

                if (!fs.existsSync(uploadPath)) {
                    fs.mkdirSync(uploadPath, { recursive: true });
                }

                callback(null, `${uploadPath}`);
            },
            filename: (req, file, callback) => {
                callback(null, `${file.originalname}`);
            },
        }),
    }))
    async updateCompanyProfileById(@Request() req,
        @Body() companyProfileDto: CompanyProfileDto,
        @UploadedFile() file: Express.Multer.File): Promise<any | null> {
        const accountId = req.user.accountId
        const existingProfile = await this.companyProfileService.getCompanyProfileByAccountId(accountId);
        console.log("??????????????????", existingProfile)
        const oldFilePath = `./companyProfilePicture/${accountId}/${existingProfile.profilePicture}`  // all file path
        console.log("all details....", oldFilePath)
        if (file) {

            const allfile = fs.existsSync(oldFilePath)  // get true or false
            console.log("all files .............???", allfile)

            if (fs.existsSync(oldFilePath)) {
                console.log()
                fs.unlinkSync(oldFilePath);
            }

            companyProfileDto.profilePicture = `${file.filename}`;
        }
        return this.companyProfileService.updateCompanyProfileById(accountId, companyProfileDto);
    }

    @Get('allCompanyProfile')
    @UseGuards(AuthGuard("jwt"))
    async getAllCompanyProfile(@Query('page') page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 10,): Promise<any | null> {
        return this.companyProfileService.getAllCompanyProfile(page,limit)
    }

    @Put('deActivate/:id')  // deactive user
    async deActivateCompanyProfileById(@Param('id') id: string, @Query('status') status: boolean): Promise<any | null> {
        return this.companyProfileService.deActivateCompanyProfileById(id, status);
    }

}