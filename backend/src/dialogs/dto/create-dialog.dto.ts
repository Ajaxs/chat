import { IsString, IsNumber, IsArray, IsOptional } from 'class-validator';

export class CreateDialogDTO {
  @IsString()
  public title: string;

  @IsNumber()
  public admin: number;

  @IsOptional()
  @IsArray()
  public users: number[];
}
