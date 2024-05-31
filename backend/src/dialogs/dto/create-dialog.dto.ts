import { IsString, IsNumber, IsArray, IsOptional } from 'class-validator';
import { UserEntity } from '../../users/users.entity';

export class CreateDialogDTO {
  @IsString()
  public title: string;

  @IsNumber()
  public admin: number;

  @IsNumber()
  public is_group: number;

  @IsOptional()
  @IsArray()
  public users: Partial<UserEntity>[];
}
