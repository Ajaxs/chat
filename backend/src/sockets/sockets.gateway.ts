import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UserStatus } from '../shared/types/users';
import { Injectable } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
@Injectable()
export class SocketsService
  implements OnGatewayConnection, OnGatewayDisconnect
{
  public users = new Map();
  @WebSocketServer() server: Server = new Server();

  @SubscribeMessage('change-user-status')
  private changeUserStatus(@MessageBody() data: UserStatus): void {
    const user = this.users.get(data.userId);
    this.users.set(data.userId, {
      ...user,
      isOnline: data.isOnline,
    });

    this.server.emit('update-user-status', {
      id: data.userId,
      is_online: data.isOnline,
    });
  }

  public sendEvent(eventname: string, data: object) {
    this.server.emit(eventname, JSON.stringify(data));
  }

  public sendEventSomeUsers(
    eventName: string,
    data: object,
    usersIds: { id: number }[],
  ) {
    usersIds.forEach((item: { id: number }) => {
      if (this.users.has(item.id)) {
        const user = this.users.get(item.id);
        this.server.to(user.socket).emit(eventName, JSON.stringify(data));
      }
    });
  }

  public async handleConnection(socket: Socket): Promise<void> {
    this.users.set(socket.handshake.auth.userId, {
      socket: socket.id,
      isOnline: true,
    });
    //console.log('users connected', this.users);
  }

  public async handleDisconnect(socket: Socket): Promise<void> {
    this.users.delete(socket.handshake.auth.userId);
    //console.log('users disconnected', this.users);
  }
}
