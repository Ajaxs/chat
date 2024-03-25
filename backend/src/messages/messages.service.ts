import { Injectable } from '@nestjs/common';
import { MessageEntity } from './messages.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Geteway } from '../sockets/sockets.gateway';
import { DialogsService } from '../dialogs/dialogs.service';
import { MessageRDO } from './rdo/message.rdo';
import { CreateMessageDTO } from './dto/create-message';
import { EVENT_NEW_MESSAGE } from './messages.constant';
import { QueryParams } from '../shared/types/messages';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly messagesRepository: Repository<MessageEntity>,
    private readonly dialogsService: DialogsService,
    private readonly socket: Geteway,
  ) {}

  public async findAll(params: QueryParams) {
    const messages = await this.messagesRepository.find({ where: params });
    return messages.map((message: MessageEntity) => new MessageRDO(message));
  }

  findOne(id: number): Promise<MessageEntity | null> {
    return this.messagesRepository.findOneBy({ id });
  }

  async create(data: CreateMessageDTO): Promise<void> {
    const message = await this.messagesRepository.save(data);
    const dialog = await this.dialogsService.findOne(message.dialog_id);
    // Send event via socket
    this.socket.sendEventSomeUsers(
      EVENT_NEW_MESSAGE,
      new MessageRDO(message),
      dialog.users,
    );
  }

  async remove(id: number): Promise<void> {
    await this.messagesRepository.delete(id);
  }
}
