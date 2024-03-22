import { Expose } from 'class-transformer';

export class UserRdo {
  @Expose()
  public id: number;

  @Expose()
  public email: string;

  @Expose()
  public firstname: string;

  @Expose()
  public lastname: string;

  @Expose()
  public avatar: string;
}
