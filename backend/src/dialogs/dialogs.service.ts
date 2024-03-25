import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DialogEntity } from './dialogs.entity';
import { Repository, DataSource } from 'typeorm';
import { UserEntity } from '../users/users.entity';

@Injectable()
export class DialogsService {
  constructor(
    @InjectRepository(DialogEntity)
    private readonly dialogRepository: Repository<DialogEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly dataSource: DataSource,
  ) {}

  public async findAll(user) {
    const dialogs = await this.dialogRepository.find({
      select: {
        users: {
          id: true,
        },
      },
      relations: {
        users: true,
      },
      where: {
        users: { id: user.id },
      },
    });
    // ewrw
    const dialogsId = dialogs.map((item) => item.id);
    const users = await this.dataSource.query(
      `SELECT * FROM dialogs_users WHERE dialog_id IN (${dialogsId.join(',')})`,
    );

    const result = [];

    for (let i = 0; i < dialogs.length; i++) {
      const dialogItem = dialogs[i];
      const usersId = users
        .filter((userItem) => userItem.dialog_id === dialogItem.id)
        .map((item) => item.user_id);

      if (usersId.length === 2) {
        const companionId = usersId.filter((item) => item !== user.id);
        const companion = await this.userRepository.findOne({
          where: { id: companionId },
        });
        dialogItem.title = `${companion.firstname} ${companion.lastname}`;
      }
      dialogItem.users = usersId;
      result.push(dialogItem);
    }

    return result;
  }

  public findOne(id: number): Promise<DialogEntity | null> {
    return this.dialogRepository.findOne({
      select: {
        users: {
          id: true,
        },
      },
      relations: {
        users: true,
      },
      where: { id },
    });
  }

  public async update(id: number, data): Promise<void> {
    await this.dialogRepository.update(id, data);
  }

  public async remove(id: number): Promise<void> {
    await this.dialogRepository.delete(id);
  }
}
