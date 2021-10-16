import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from '../utils/base.repository';
import { ContentAreaDto } from './content-area.dto';
import { ContentArea } from './content-area.schema';

export class ContentAreaRepository extends BaseRepository<
  ContentArea,
  ContentAreaDto
> {
  constructor(
    @InjectModel(ContentArea.name) private contentAreaModel: Model<ContentArea>
  ) {
    super(contentAreaModel);
  }
}
