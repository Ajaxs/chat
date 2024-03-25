import { Module } from '@nestjs/common';
import { Geteway } from './sockets.gateway';

@Module({
  providers: [Geteway],
})
export class SocketsModule {}
