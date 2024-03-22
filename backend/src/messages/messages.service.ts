import { Injectable } from '@nestjs/common';
import { MessageEntity } from './messages.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly messagesRepository: Repository<MessageEntity>,
  ) {}

  public findAll(params): Promise<MessageEntity[]> {
    return this.messagesRepository.find({ where: params });
  }

  findOne(id: number): Promise<MessageEntity | null> {
    return this.messagesRepository.findOneBy({ id });
  }

  async create(data): Promise<MessageEntity | null> {
    return this.messagesRepository.save(data);
  }

  async remove(id: number): Promise<void> {
    await this.messagesRepository.delete(id);
  }
}
