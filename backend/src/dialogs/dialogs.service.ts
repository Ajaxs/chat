import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DialogEntity } from './dialogs.entity';
import { Repository, DataSource } from 'typeorm';
import { UserEntity } from '../users/users.entity';
import { CreateDialogDTO } from './dto/create-dialog.dto';

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

    const dialogsId = dialogs.map((item) => item.id).join(',');
    const users = await this.dataSource.query(
      `SELECT * FROM dialogs_users WHERE dialog_id IN (${dialogsId})`,
    );

    const userGroupByDialog = users.reduce((group, dialog) => {
      const { dialog_id, user_id } = dialog;
      group[dialog_id] = group[dialog_id] ?? [];
      group[dialog_id].push(user_id);
      return group;
    }, {});

    const result = [];

    for (let i = 0; i < dialogs.length; i++) {
      const dialogItem = dialogs[i];
      dialogItem.users = userGroupByDialog[dialogItem.id];
      dialogItem.users.sort();

      if (dialogItem.is_group === 0) {
        const companionId = dialogItem.users.find((item) => item !== user.id);
        const companion = await this.userRepository.findOne({
          where: { id: Number(companionId) },
        });
        dialogItem.title = `${companion.firstname} ${companion.lastname}`;
      }

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

  public async create(data: CreateDialogDTO): Promise<number> {
    data.users = data.users.map((item) => ({ id: Number(item) }));
    const dialog = await this.dialogRepository.save(data);
    return dialog.id;
  }

  public async update(id: number, data): Promise<void> {
    await this.dialogRepository.update(id, data);
  }

  public async remove(id: number): Promise<void> {
    await this.dialogRepository.delete(id);
  }
}
