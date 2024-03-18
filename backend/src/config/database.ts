import { ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';

export const configDatabase: TypeOrmModuleAsyncOptions = {
  useFactory: async (config: ConfigService): Promise<TypeOrmModuleOptions> => {
    return {
      type: 'mysql',
      host: config.get('DATABASE_HOST') || '127.0.0.1',
      port: config.get('DATABASE_PORT') || 3306,
      username: config.get('DATABASE_USER') || 'root',
      password: config.get('DATABASE_PASSWORD') || '',
      database: config.get('DATABASE_NAME'),
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      //entities: [UserEntity, DialogEntity],
      synchronize: true,
    };
  },
  inject: [ConfigService],
};
