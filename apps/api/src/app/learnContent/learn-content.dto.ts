import { ContentArea } from '../contentArea/content-area.schema';

export class LearnContentDto {
  id?: string;

  name: string;

  contentAreas: ContentArea[];

  active: boolean;
}
