import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Skill } from "./skill.schema";

@Injectable()
export class SkillService {

    constructor(@InjectModel('skill')
    private skillModel: Model<Skill>) { }

    async getAllSkill(): Promise<any[]> {
        const skills = await this.skillModel.find();
        return skills;
    }
}