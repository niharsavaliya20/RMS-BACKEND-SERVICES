import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoConfigModule } from 'src/mongo/config.module';
import { MongoConfigService } from 'src/mongo/config.service';
@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [MongoConfigModule],
      useFactory: async (mongoConfigService: MongoConfigService) => ({
        uri: mongoConfigService.uri,
        // port: mongoConfigService.port,
        // username: mongoConfigService.username,
        // password: mongoConfigService.password,
        // database: mongoConfigService.database,
      }),
      inject: [MongoConfigService],
    }),
  ],
})
export class MongoDatabaseProviderModule {}
