import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Employer_StatusSchema } from './employer_status.schema';
import { Employer_StatusService } from './employer_status.service';
import { Employer_StatusController } from './employer_status.controller';
// import { EmployeeProfileSchema } from '../employeeProfile/employeeProfile.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'employer_status', schema: Employer_StatusSchema}])],
    controllers: [Employer_StatusController],
    providers: [Employer_StatusService],
})
export class Employer_StatusModule {}