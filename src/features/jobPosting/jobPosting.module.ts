import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JobPostingService } from './jobPosting.service';
import { JobPostingController } from './jobPosting.controller';
import { JobPostingSchema } from './jobPosting.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'jobposting', schema: JobPostingSchema}])],
    controllers: [JobPostingController],
    providers: [JobPostingService],
})
export class JobPostingModule {}