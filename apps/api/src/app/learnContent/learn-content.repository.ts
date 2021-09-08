import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from '../utils/base.repository';
import { LearningContentDto } from './learn-content.dto';
import { LearningContent } from './learn-content.schema';

export class LearnContentRepository extends BaseRepository<
  LearningContent,
  LearningContentDto
> {
  constructor(
    @InjectModel(LearningContent.name)
    private learnContentModel: Model<LearningContent>
  ) {
    super(learnContentModel);
  }
}
