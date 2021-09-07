import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseSchema } from '../utils/base.schema';

@Schema(BaseSchema)
export class ContentArea extends Document {
  id: string;
  name: string;
  active: boolean;
}

export const ContentAreaSchema = SchemaFactory.createForClass(ContentArea);
