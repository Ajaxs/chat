import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Registration } from '../auth/auth.interface';
import { fillObject } from 'src/helpers/helper';
import { UserRdo } from './rdo/users.rdo';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  public async findAll() {
    const users = await this.usersService.findAll();
    return users.map((item) => fillObject(UserRdo, item));
  }

  @Get(':id')
  public findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Post()
  public create(@Body() data: Registration) {
    return this.usersService.create(data);
  }
}
