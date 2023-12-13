import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployerProfileSchema } from './employer.schema';
import { EmployerProfileService } from './employer.service';
import { EmployerProfileController } from './employer.controller';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'employerProfile', schema: EmployerProfileSchema }])],
    controllers: [EmployerProfileController],
    providers: [EmployerProfileService],
})
export class EmployerProfileModule {}