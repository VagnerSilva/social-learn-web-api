import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { BaseSchema } from '../schemas/base.schema';
import { Profile } from '../schemas/profile.schema';

@Schema({
  timestamps: { createdAt: 'createdDate', updatedAt: 'lastModifiedDate' },
})
export class User extends BaseSchema {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ index: true })
  email: string;

  @Prop()
  password: string;

  @Prop()
  gender: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile',
  })
  profile: Profile[];
}

export const UserSchema = SchemaFactory.createForClass(User);
