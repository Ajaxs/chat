import { UserEntity } from 'src/users/users.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  JoinTable,
  ManyToMany,
} from 'typeorm';

@Entity('dialogs')
export class DialogEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  admin: number;

  @CreateDateColumn()
  created_at: Date;

  @ManyToMany(() => UserEntity, (user) => user.dialogs)
  @JoinTable({
    name: 'dialogs_users', // table name for the junction table of this relation
    joinColumn: {
      name: 'dialog_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
  })
  users: UserEntity[];
}
