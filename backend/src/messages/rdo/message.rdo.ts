import * as dayjs from 'dayjs';
import { MessageEntity } from '../messages.entity';

export class MessageRDO {
  public id: number;
  public user_id: number;
  public dialog_id: number;
  public text: string;
  public timestamp: number;
  public time: string;
  public date: string;

  constructor(message: MessageEntity) {
    const date = dayjs(message.created_at);
    this.id = message.id;
    this.user_id = message.user_id;
    this.dialog_id = message.dialog_id;
    this.text = message.text;
    this.timestamp = date.unix();
    this.time = date.format('HH:mm');
    this.date = date.format('D-MM-YYYY');
  }
}
