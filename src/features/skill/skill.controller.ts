import { Controller, Get } from "@nestjs/common";
import { SkillService } from "./skill.service";

@Controller('skill')
export class SkillController{

    constructor(private skillService: SkillService) { }
    
    @Get('getAll')
    // @UseGuards(AuthGuard("jwt"))
    getAllSkill(): Promise<any[]>{
        return this.skillService.getAllSkill();
    }
}