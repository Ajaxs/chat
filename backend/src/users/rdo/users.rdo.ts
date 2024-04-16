import { UserEntity } from '../users.entity';

export class UserRDO {
  public id: number;
  public email: string;
  public firstname: string;
  public lastname: string;
  public avatar: string;
  public is_online: boolean;

  constructor(user: UserEntity, usersStatus) {
    const isOnline = usersStatus.has(user.id)
      ? usersStatus.get(user.id).isOnline
      : false;
    this.id = user.id;
    this.email = user.email;
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.avatar = user.avatar;
    this.is_online = isOnline;
  }
}
