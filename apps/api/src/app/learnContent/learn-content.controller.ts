/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller } from '@nestjs/common';
import { BaseController } from '../utils/base.controller';
import { LearnContentService } from './learn-content.service';

@Controller('learningContents')
export class LearnContentController extends BaseController<LearnContentService> {
  constructor(private learnContentService: LearnContentService) {
    super(learnContentService);
  }
}
