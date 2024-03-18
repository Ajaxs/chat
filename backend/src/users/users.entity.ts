import { DialogEntity } from 'src/dialogs/dialogs.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  avatar: string;

  @ManyToMany(() => DialogEntity, (dialog) => dialog.users)
  dialogs: DialogEntity[];
}
