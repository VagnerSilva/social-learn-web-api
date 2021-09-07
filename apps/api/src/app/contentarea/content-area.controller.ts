import { Controller } from '@nestjs/common';
import { BaseController } from '../utils/base.controller';
import { ContentAreaService } from './content-area.service';

@Controller()
export class ContentAreaController extends BaseController<ContentAreaService> {
  constructor(private readonly contentAreaService: ContentAreaService) {
    super(contentAreaService);
  }
}
