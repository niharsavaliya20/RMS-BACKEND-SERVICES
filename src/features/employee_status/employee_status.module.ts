import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Employee_StatusController } from './employee_status.controller';
import { Employee_StatusService } from './employee_status.service';
import { Employee_StatusSchema } from './employee_status.schema';
// import { EmployeeProfileSchema } from '../employeeProfile/employeeProfile.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'employee_status', schema: Employee_StatusSchema}])],
    controllers: [Employee_StatusController],
    providers: [Employee_StatusService],
})
export class Employee_StatusModule {}