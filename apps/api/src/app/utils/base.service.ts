/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpException, HttpStatus } from '@nestjs/common';
import { BaseRepository } from './base.repository';

export class BaseService<S, D, R> {
  constructor(private readonly repository: R & BaseRepository<any, any>) {}

  async create(profile: D): Promise<D> {
    return ((await this.repository.insert(profile)) as unknown) as D;
  }

  /**
   * Excluir por id
   * @param id
   */
  async deleteById(id: string) {
    await this.repository.delete(id);
  }

  /**
   * Busca por id
   * @param id
   * @param msgError mensagem de erro ao nao encontra dado
   * @returns any
   */
  async findById(id: string): Promise<S> {
    const data = this.repository.findById(id);
    if (!data) {
      throw new HttpException('Item  não encontrado', HttpStatus.BAD_REQUEST);
    }

    return data;
  }

  /**
   * atualizar dado
   * @param id
   * @param data
   * @param msgError mensagem de erro ao nao encontra dado
   * @returns
   */
  async update(id: string, data: D, msgError: string): Promise<D> {
    const result = await this.repository.findByIdAndUpdate({ id }, data);

    if (!result) {
      throw new HttpException(msgError, HttpStatus.BAD_REQUEST);
    }

    return result as D;
  }

  /**
   *  Busca todos os dados
   * @returns any
   */
  async findAll(): Promise<D[]> {
    return this.repository.findAll() as Promise<D[]>;
  }

  /**
   * Inativar
   * @param id
   * @returns any
   */
  async inactivate(id: string): Promise<D> {
    const data = await this.repository.findById(id);
    data.active = false;
    const save = await this.repository.insert(data as D);
    return (save as unknown) as D;
  }
}
