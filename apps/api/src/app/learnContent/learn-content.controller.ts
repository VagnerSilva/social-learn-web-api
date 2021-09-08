/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller } from '@nestjs/common';
import { ContentAreaService } from '../contentarea/content-area.service';
import { BaseController } from '../utils/base.controller';

@Controller()
export class LearnContentController extends BaseController<ContentAreaService> {
  constructor(private contentAreaService: ContentAreaService) {
    super(contentAreaService);
  }
}
