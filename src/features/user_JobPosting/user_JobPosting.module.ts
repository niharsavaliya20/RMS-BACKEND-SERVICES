import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserJobPostingSchema } from "./user_JobPosting.schema";
import { UserJobPostingController } from "./user_JobPosting.controller";
import { UserJobPostingService } from "./user_JobPosting.service";

@Module({
    imports: [MongooseModule.forFeature([{ name: 'user_JobPosting', schema: UserJobPostingSchema}])],
    controllers: [UserJobPostingController],
    providers: [UserJobPostingService],
})
export class UserJobPostingModule {}