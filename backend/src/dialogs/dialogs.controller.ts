import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { DialogsService } from './dialogs.service';
import { CreateDialogDTO } from './dto/create-dialog.dto';

@Controller('dialogs')
export class DialogsController {
  constructor(private readonly dialogService: DialogsService) {}

  @Get()
  public findAll(@Req() request) {
    return this.dialogService.findAll(request.user);
  }

  @Post()
  public create(@Body() data: CreateDialogDTO) {
    return this.dialogService.create(data);
  }
}
