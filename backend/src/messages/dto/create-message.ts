import { IsString, IsNumber } from 'class-validator';

export class CreateMessageDTO {
  @IsNumber()
  public user_id: number;

  @IsNumber()
  public dialog_id: number;

  @IsString()
  public text: string;
}
