import { Controller, Get, UseGuards } from "@nestjs/common";
import { Employee_StatusService } from "./employee_status.service";
import { AuthGuard } from "@nestjs/passport";

@Controller('employee_status')
export class Employee_StatusController{

    constructor(private employee_statusService: Employee_StatusService) { }
    
    @Get('get/AplicantStatus')
    @UseGuards(AuthGuard("jwt"))
    getAllEmployeeStatus(): Promise<any[]>{
        return this.employee_statusService.getAllEmployeeStatus();
    }
}