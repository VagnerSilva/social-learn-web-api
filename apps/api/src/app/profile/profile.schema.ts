import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { BaseSchema } from '../schemas/base.schema';
import { User } from '../user/user.schema';

@Schema({
  timestamps: { createdAt: 'createdDate', updatedAt: 'lastModifiedDate' },
})
export class Profile extends BaseSchema {
  @Prop()
  name: string;

  @Prop()
  active = true;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  user: User[];
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
