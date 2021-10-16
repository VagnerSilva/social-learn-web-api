import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseSchema } from '../utils/base.schema';

@Schema(BaseSchema)
export class ContentArea extends Document {
  @Prop()
  _id?: string;

  @Prop()
  name?: string;

  @Prop()
  title?: string;

  @Prop()
  active: boolean;
}

export const ContentAreaSchema = SchemaFactory.createForClass(ContentArea);
