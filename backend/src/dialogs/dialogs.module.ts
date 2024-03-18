import { Module } from '@nestjs/common';
import { DialogsService } from './dialogs.service';
import { DialogsController } from './dialogs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DialogEntity } from './dialogs.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DialogEntity])],
  providers: [DialogsService],
  controllers: [DialogsController],
})
export class DialogsModule {}
