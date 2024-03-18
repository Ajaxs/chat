import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Auth, Login } from './auth.interface';
import { UsersService } from '../users/users.service';
import { compare } from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/users/users.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {}

  public async comparePassword(
    password: string,
    hash: string,
  ): Promise<boolean> {
    return compare(password, hash);
  }

  public async createTokens(user: User) {
    const payload = {
      id: user.id,
    };

    return {
      accessToken: await this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: this.configService.get('JWT_ACCESS_EXPIRES_IN'),
      }),
      refreshToken: await this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN'),
      }),
    };
  }


  public async login(data: Login) {
    const user = await this.usersService.findByEmail(data.email);

    if (!user) {
      throw new NotFoundException(Auth.InvalidLoginOrPassword);
    }

    if (!(await this.comparePassword(data.password, user.password))) {
      throw new UnauthorizedException(Auth.InvalidLoginOrPassword);
    }

    return this.createTokens(user);
  }
}
