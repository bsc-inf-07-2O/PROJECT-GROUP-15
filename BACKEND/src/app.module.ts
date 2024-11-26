import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmAsyncConfig } from './config/typeorm.config';
import { ConfigModule } from '@nestjs/config'; // Import ConfigModule
import { BondingModule } from './bonding/bonding.module';
import { ErigibleModule } from './erigible/erigible.module';
import { CustomMailerModule } from './mailer/mailer.module';
import { AuthModule } from './auth/auth.module';
import { UniversityModule } from './university/university.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    BondingModule,
    ErigibleModule,
    AuthModule,
    UniversityModule,
    CustomMailerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
