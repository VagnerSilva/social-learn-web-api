/*
https://docs.nestjs.com/modules
*/
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ContentAreaModule } from '../contentarea/content-area.module';
import { LearnContentController } from './learn-content.controller';
import { LearnContentRepository } from './learn-content.repository';
import { LearningContent, LearningContentSchema } from './learn-content.schema';
import { LearnContentService } from './learn-content.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: LearningContent.name, schema: LearningContentSchema },
    ]),
    ContentAreaModule,
  ],
  controllers: [LearnContentController],
  providers: [LearnContentService, LearnContentRepository],
  exports: [LearnContentService],
})
export class LearnContentModule {}
