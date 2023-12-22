import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountSchema } from './account.schema';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'account', schema: AccountSchema }])],
    controllers: [AccountController],
    providers: [AccountService],
})
export class AccountModule {}