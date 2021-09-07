import { SchemaOptions } from '@nestjs/mongoose';

export const BaseSchema: SchemaOptions = {
  timestamps: { createdAt: 'createdDate', updatedAt: 'lastModifiedDate' },
  toJSON: {
    transform: function (_, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    },
  },
};
