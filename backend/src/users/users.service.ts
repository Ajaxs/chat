import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './users.entity';
import { Registration } from '../auth/auth.interface';
import { genSalt, hash } from 'bcrypt';

const SALT_ROUNDS = 3;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  public async hashPassword(password: string): Promise<string> {
    const salt = await genSalt(SALT_ROUNDS);
    return hash(password, salt);
  }

  public findAll(): Promise<UserEntity[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<UserEntity | null> {
    return this.usersRepository.findOneBy({ id });
  }

  findByEmail(email: string): Promise<UserEntity | null> {
    return this.usersRepository.findOneBy({ email });
  }

  async create(data: Registration): Promise<UserEntity | null> {
    data.password = await this.hashPassword(data.password);
    return this.usersRepository.save(data);
  }

  async update(id: number, data: Registration): Promise<void> {
    await this.usersRepository.update(id, data);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
