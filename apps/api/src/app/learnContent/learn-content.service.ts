/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { BaseService } from '../utils/base.service';
import { LearningContentDto } from './learn-content.dto';
import { LearnContentRepository } from './learn-content.repository';
import { LearningContent } from './learn-content.schema';

@Injectable()
export class LearnContentService extends BaseService<
  LearningContent,
  LearningContentDto,
  LearnContentRepository
> {
  constructor(private readonly learnContentRepository: LearnContentRepository) {
    super(learnContentRepository);
  }
}
