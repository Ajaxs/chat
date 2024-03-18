import { Controller, Get } from '@nestjs/common';
import { DialogsService } from './dialogs.service';

@Controller('dialogs')
export class DialogsController {
  constructor(private readonly dialogService: DialogsService) {}

  @Get()
  public findAll() {
    return this.dialogService.findAll();
  }
}
