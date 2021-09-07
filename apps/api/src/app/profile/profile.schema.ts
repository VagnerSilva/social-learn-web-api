import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { User } from '../user/user.schema';
@Schema({
  timestamps: { createdAt: 'createdDate', updatedAt: 'lastModifiedDate' },
})
export class Profile extends Document {
  @Prop()
  id?: string;

  @Prop()
  name: string;

  @Prop({ default: true })
  active: boolean;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  user: User[];
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
