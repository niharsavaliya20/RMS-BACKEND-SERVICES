import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { employee_status } from "./employee_status.schema";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class Employee_StatusService {

    constructor(@InjectModel('employee_status')
    private employee_statusModel: Model<employee_status>) { }

    async getAllEmployeeStatus(): Promise<any[]> {
        const applicantStatus = await this.employee_statusModel.find();
        return applicantStatus;
    }
}