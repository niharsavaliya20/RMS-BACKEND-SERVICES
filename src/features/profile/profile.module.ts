import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfileSchema } from './profile.schema';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'profile', schema: ProfileSchema }])],
    controllers: [ProfileController],
    providers: [ProfileService],
})
export class ProfileModule {}