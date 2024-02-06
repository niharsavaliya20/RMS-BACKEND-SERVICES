import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SkillSchema } from './skill.schema';
import { SkillService } from './skill.service';
import { SkillController } from './skill.controller';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'skill', schema: SkillSchema}])],
    controllers: [SkillController],
    providers: [SkillService],
})
export class SkillModule {}