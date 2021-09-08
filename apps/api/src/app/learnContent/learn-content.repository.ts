import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from '../utils/base.repository';
import { LearnContentDto } from './learn-content.dto';
import { LearnContent } from './learn-content.schema';

export class LearnContentRepository extends BaseRepository<
  LearnContent,
  LearnContentDto
> {
  constructor(
    @InjectModel(LearnContent.name)
    private learnContentModel: Model<LearnContent>
  ) {
    super(learnContentModel);
  }
}
