import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeeProfileSchema } from './employeeProfile.schema';
import { EmployeeProfileController } from './employeeProfile.controller';
import { EmployeeProfileService } from './employeeProfile.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'employeeProfile', schema: EmployeeProfileSchema }])],
    controllers: [EmployeeProfileController],
    providers: [EmployeeProfileService],
})
export class EmployeeProfileModule {}