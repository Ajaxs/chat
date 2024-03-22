import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DialogEntity } from './dialogs.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DialogsService {
  constructor(
    @InjectRepository(DialogEntity)
    private readonly repository: Repository<DialogEntity>,
  ) {}

  public findAll(): Promise<DialogEntity[]> {
    return this.repository.find({
      select: {
        users: {
          id: true,
        },
      },
      relations: {
        users: true,
      },
    });
  }

  findOne(id: number): Promise<DialogEntity | null> {
    return this.repository.findOneBy({ id });
  }

  async update(id: number, data): Promise<void> {
    await this.repository.update(id, data);
  }

  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
