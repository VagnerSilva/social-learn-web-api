import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { compare, genSalt } from 'bcrypt';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { LearningContent } from '../learnContent/learn-content.schema';
import { Profile } from '../profile/profile.schema';
import { BaseSchema } from '../utils/base.schema';
@Schema(BaseSchema)
export class User extends Document {
  @Prop()
  id?: string;

  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ index: true })
  email: string;

  @Prop()
  password: string;

  @Prop()
  gender: string;

  @Prop()
  recoverToken: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile',
  })
  profile: Profile[];

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LearningContent',
  })
  learningContents: LearningContent[];
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next: (value?: any) => void) {
  if (!this.isModified('password')) return next();
  const salt = await genSalt(14);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.comparePassword = function (candidatePassword) {
  const pass = this.password;
  return new Promise((resolve, reject) => {
    compare(candidatePassword, pass, (err, isMatch) => {
      if (err) return reject(err);
      resolve(isMatch);
    });
  });
};
