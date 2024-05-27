import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
<<<<<<<< HEAD:src/core/database.module.ts
import { Task } from '../task/infrastructure/persistence/entities/task.entity';
========
import { Task } from './task/entities/task.entity';
>>>>>>>> 82d147b956a0d5d24c66a5210865135cf51be5e8:src/database.module.ts

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        entities: [Task],
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseModule {}