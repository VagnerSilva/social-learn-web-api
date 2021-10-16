import { Controller } from '@nestjs/common';
import { BaseController } from '../utils/base.controller';
import { ContentAreaDto } from './content-area.dto';
import { ContentAreaService } from './content-area.service';

@Controller('contentAreas')
export class ContentAreaController extends BaseController<
  ContentAreaService,
  ContentAreaDto
> {
  constructor(private readonly contentAreaService: ContentAreaService) {
    super(contentAreaService);
  }
}
