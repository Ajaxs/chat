import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { MessageEntity } from './messages.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Geteway } from '../sockets/sockets.gateway';
import { DialogsModule } from 'src/dialogs/dialogs.module';

@Module({
  imports: [DialogsModule, TypeOrmModule.forFeature([MessageEntity])],
  controllers: [MessagesController],
  providers: [MessagesService, Geteway],
})
export class MessagesModule {}
