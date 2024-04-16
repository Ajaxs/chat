import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDTO } from './dto/create-message';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get()
  public async findAll(@Req() request, @Query() params) {
    return await this.messagesService.findAll(params);
  }

  @Get(':id')
  public findOne(@Param('id', ParseIntPipe) id: number) {
    return this.messagesService.findOne(id);
  }

  @Post()
  public create(@Body() data: CreateMessageDTO) {
    return this.messagesService.create(data);
  }
}
