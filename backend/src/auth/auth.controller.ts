import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Login, RefreshParams } from './auth.interface';
import { Public } from './auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  public login(@Body() data: Login) {
    return this.authService.login(data);
  }

  @Public()
  @Get('refresh')
  public refresh(@Query() params: RefreshParams) {
    return this.authService.refresh(params.refreshToken);
  }

  @Get('user')
  public async authUser(@Req() request) {
    return request.user;
  }
}
