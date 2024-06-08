import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsageModule } from './usage/usage.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsageController } from './usage/usage.controller';
import { UsageService } from './usage/usage.service';
import { Usage, UsageSchema } from './usage/schemas/usage.schema';

@Module({
  imports: [
    UsageModule,
    MongooseModule.forFeature([{ name: Usage.name, schema: UsageSchema }]),
    MongooseModule.forRoot(
      'mongodb://root:root@localhost:27017/internet?authSource=admin',
    ),
  ],
  controllers: [AppController, UsageController],
  providers: [AppService, UsageService],
})
export class AppModule {}
