import { Document, EnforceDocument, FilterQuery, Model, Query } from 'mongoose';

export class BaseRepository<T, K> {
  constructor(private model: Model<T>) {}

  async find(query: FilterQuery<T>): Promise<T[]> {
    return this.model.find(query);
  }

  async findById(id: string): Promise<T> {
    return this.model.findById(id);
  }

  async insert(newUser: K): Promise<Document<T>> {
    const user = new this.model(newUser);
    return user.save();
  }

  async findByIdAndUpdate(query: FilterQuery<T>, data: Partial<T>): Promise<T> {
    return this.model.findByIdAndUpdate(query, data as T);
  }

  async delete(id: string): Promise<Query<T, EnforceDocument<T, T>, T, T>> {
    return this.model.remove(id);
  }

  async findAll(): Promise<T[]> {
    return await this.model.find();
  }
}
