import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { Registration } from '../auth/auth.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  public findAll() {
    return this.usersService.findAll();
  }

  @Post()
  public create(@Body() data: Registration) {
    return this.usersService.create(data);
  }
}
