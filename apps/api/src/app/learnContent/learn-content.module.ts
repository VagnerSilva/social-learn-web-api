/*
https://docs.nestjs.com/modules
*/
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LearnContentController } from './learn-content.controller';
import { LearnContentRepository } from './learn-content.repository';
import { LearnContent, LearnContentSchema } from './learn-content.schema';
import { LearnContentService } from './learn-content.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: LearnContent.name, schema: LearnContentSchema },
    ]),
  ],
  controllers: [LearnContentController],
  providers: [LearnContentService, LearnContentRepository],
  exports: [LearnContentService],
})
export class LearnContentModule {}
