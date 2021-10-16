import { ContentArea } from '../contentarea/content-area.schema';

export class LearningContentDto {
  id?: string;

  name: string;

  contentAreas: ContentArea[];

  contentAreaIds?: string[];

  active: boolean;
}
