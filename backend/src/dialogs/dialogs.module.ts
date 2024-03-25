import { Module } from '@nestjs/common';
import { DialogsService } from './dialogs.service';
import { DialogsController } from './dialogs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DialogEntity } from './dialogs.entity';
import { UsersModule } from '../users/users.module';
import { UserEntity } from '../users/users.entity';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([DialogEntity, UserEntity])],
  providers: [DialogsService],
  controllers: [DialogsController],
  exports: [DialogsService],
})
export class DialogsModule {}
