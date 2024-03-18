import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Login } from './auth.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  public login(@Body() data: Login) {
    return this.authService.login(data);
  }

  @Post('refresh')
  public refresh() {
    return 1;
  }
}
