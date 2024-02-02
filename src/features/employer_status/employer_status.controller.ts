import { Controller, Get } from "@nestjs/common";
import { Employer_StatusService } from "./employer_status.service";

@Controller('employer_status')
export class Employer_StatusController{

    constructor(private employer_statusService: Employer_StatusService) { }
    
    @Get('get/AplicantStatus')
    // @UseGuards(AuthGuard("jwt"))
    getAllEmployerStatus(): Promise<any[]>{
        return this.employer_statusService.getAllEmployerStatus();
    }
}