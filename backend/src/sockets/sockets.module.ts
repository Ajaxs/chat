import { Global, Module } from '@nestjs/common';
import { SocketsService } from './sockets.gateway';

@Global()
@Module({
  providers: [SocketsService],
  exports: [SocketsService],
})
export class SocketsModule {}
