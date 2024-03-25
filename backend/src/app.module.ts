import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { DialogsModule } from './dialogs/dialogs.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { MessagesModule } from './messages/messages.module';
import { configDatabase } from './config/database';
import { SocketsModule } from './sockets/sockets.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync(configDatabase),
    UsersModule,
    AuthModule,
    DialogsModule,
    MessagesModule,
    SocketsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
