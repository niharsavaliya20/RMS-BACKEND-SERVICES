import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyProfileSchema } from './companyProfile.schema';
import { CompanyProfileController } from './companyProfile.controller';
import { CompanyProfileService } from './companyProfile.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'companyProfile', schema: CompanyProfileSchema}])],
    controllers: [CompanyProfileController],
    providers: [CompanyProfileService],
})
export class CompanyProfileModule {}