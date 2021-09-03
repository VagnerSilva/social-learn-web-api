import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { compare, genSalt } from 'bcrypt';
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

UserSchema.pre('save', function (next: (value?: any) => void) {
  // only hash the password if it has been modified (or is new)

  if (!this.isModified('password')) return next();

  // generate a salt
  genSalt(14, (err, salt) => {
    if (err) return next(err);

    // hash the password along with our new salt
    bcrypt.hash(this.password, salt, function (err, hash) {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      this.password = hash;
      next();
    });
  });
  // next()
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
