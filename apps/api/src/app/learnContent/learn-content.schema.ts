import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ContentArea } from '../contentarea/content-area.schema';
import { BaseSchema } from '../utils/base.schema';

@Schema(BaseSchema)
export class LearningContent extends Document {
  @Prop()
  id?: string;

  @Prop()
  name: string;

  @Prop()
  contentAreas: ContentArea[];

  @Prop()
  active: boolean;
}

export const LearningContentSchema = SchemaFactory.createForClass(
  LearningContent
);
