import { Controller, Get } from "@nestjs/common";
import { Employee_StatusService } from "./employee_status.service";

@Controller('employee_status')
export class Employee_StatusController{

    constructor(private employee_statusService: Employee_StatusService) { }
    
    @Get('get/AplicantStatus')
    // @UseGuards(AuthGuard("jwt"))
    getAllEmployeeStatus(): Promise<any[]>{
        return this.employee_statusService.getAllEmployeeStatus();
    }
}