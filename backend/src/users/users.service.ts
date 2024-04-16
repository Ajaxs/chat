import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './users.entity';
import { Registration } from '../auth/auth.interface';
import { genSalt, hash } from 'bcrypt';
import { SocketsService } from '../sockets/sockets.gateway';
import { UserRDO } from './rdo/users.rdo';

const SALT_ROUNDS = 3;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    private readonly socket: SocketsService,
  ) {}

  public async hashPassword(password: string): Promise<string> {
    const salt = await genSalt(SALT_ROUNDS);
    return hash(password, salt);
  }

  public async findAll(): Promise<UserRDO[]> {
    const users = await this.usersRepository.find();
    return users.map((item) => new UserRDO(item, this.socket.users));
  }

  public findOne(id: number): Promise<UserEntity | null> {
    return this.usersRepository.findOneBy({ id });
  }

  public findByEmail(email: string): Promise<UserEntity | null> {
    return this.usersRepository.findOneBy({ email });
  }

  public async create(data: Registration): Promise<UserEntity | null> {
    data.password = await this.hashPassword(data.password);
    return this.usersRepository.save(data);
  }

  public async update(id: number, data: Registration): Promise<void> {
    await this.usersRepository.update(id, data);
  }

  public async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
