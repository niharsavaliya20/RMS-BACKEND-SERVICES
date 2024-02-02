import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { employer_status } from "./employer_status.schema";
import { Model } from "mongoose";

@Injectable()
export class Employer_StatusService {

    constructor(@InjectModel('employer_status')
    private employer_statusModel: Model<employer_status>) { }

    async getAllEmployerStatus(): Promise<any[]> {
        const applicantStatus = await this.employer_statusModel.find();
        return applicantStatus;
    }
}