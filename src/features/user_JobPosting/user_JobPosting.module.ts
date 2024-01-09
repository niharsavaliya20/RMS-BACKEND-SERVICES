import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserJobPostingSchema } from "./user_JobPosting.schema";

@Module({
    imports: [MongooseModule.forFeature([{ name: 'user_jobposting', schema: UserJobPostingSchema}])],
    controllers: [],
    providers: [],
})
export class UserJobPostingModule {}