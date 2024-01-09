import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";


@Injectable()
export class UserJobPosting {

   constructor(@InjectModel('user_jobposting')
   private UserjobPostingModel: Model<UserJobPosting>) { }


}
