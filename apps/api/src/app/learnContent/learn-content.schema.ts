import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { ContentArea } from '../contentArea/content-area.schema';
import { BaseSchema } from '../utils/base.schema';

@Schema(BaseSchema)
export class LearningContent extends Document {
  @Prop()
  id?: string;

  @Prop()
  name: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ContentArea',
  })
  contentAreas: ContentArea[];

  @Prop()
  active: boolean;
}

export const LearningContentSchema = SchemaFactory.createForClass(
  LearningContent
);
