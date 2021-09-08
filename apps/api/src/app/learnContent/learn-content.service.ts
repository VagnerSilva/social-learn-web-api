/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { BaseService } from '../utils/base.service';
import { LearnContentDto } from './learn-content.dto';
import { LearnContentRepository } from './learn-content.repository';
import { LearnContent } from './learn-content.schema';

@Injectable()
export class LearnContentService extends BaseService<
  LearnContent,
  LearnContentDto,
  LearnContentRepository
> {
  constructor(private readonly learnContentRepository: LearnContentRepository) {
    super(learnContentRepository);
  }
}
