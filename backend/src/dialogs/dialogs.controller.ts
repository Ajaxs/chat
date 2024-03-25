import { Controller, Get, Req } from '@nestjs/common';
import { DialogsService } from './dialogs.service';

@Controller('dialogs')
export class DialogsController {
  constructor(private readonly dialogService: DialogsService) {}

  @Get()
  public findAll(@Req() request) {
    return this.dialogService.findAll(request.user);
  }
}
