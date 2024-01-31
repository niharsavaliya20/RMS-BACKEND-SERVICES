import { Body, Controller, Get, Param, Post, Put, Request, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
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
                const uploadPath = `./componayProfilePicture/${accountId}`;
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
        return this.companyProfileService.findCompanyProfile(accountId)
    }

    @Put('updateCompanyProfile/:accountId')
    @UseGuards(AuthGuard("jwt"))
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: (req, file, callback) => {

                const accountId = (req.user as CompanyProfile).accountId;    // @ get req _id from user
                const uploadPath = `./uploads/${accountId}`;

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
    async updateCompanyProfileById(@Param('accountId') accountId: string,
        @Body() companyProfileDto: CompanyProfileDto,
        @UploadedFile() file: Express.Multer.File): Promise<any | null> {
        const existingProfile = await this.companyProfileService.getCompanyProfileByAccountId(accountId);

        const oldFilePath = `./uploads/${accountId}/${existingProfile.profilePicture}`  // all file path

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

}