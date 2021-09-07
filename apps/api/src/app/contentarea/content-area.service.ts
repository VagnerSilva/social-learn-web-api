import { Injectable } from '@nestjs/common';
import { BaseService } from '../utils/base.service';
import { ContentAreaDto } from './content-area.dto';
import { ContentAreaRepository } from './content-area.repository';
import { ContentArea } from './content-area.schema';

@Injectable()
export class ContentAreaService extends BaseService<
  ContentArea,
  ContentAreaDto,
  ContentAreaRepository
> {}
