import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsageSchema, Usage } from './schemas/usage.schema';
import { UsageController } from './usage.controller';
import { UsageService } from './usage.service';

@Module({
  providers: [UsageService],
  imports: [
    MongooseModule.forFeature([{ name: Usage.name, schema: UsageSchema }]),
  ],
  controllers: [UsageController],
})
export class UsageModule {}
