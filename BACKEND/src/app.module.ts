import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmAsyncConfig } from './config/typeorm.config';
import { ConfigModule } from '@nestjs/config'; // Import ConfigModule
import { BondingModule } from './bonding/bonding.module';
import { ErigibleModule } from './erigible/erigible.module';
//import { mailerModule } from './mailer/mailer.module';
//import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
//import { MailerModule } from '@nestjs-modules/mailer';
import { AuthModule } from './auth/auth.module';
import { UniversityModule } from './university/university.module';


@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    UsersModule,
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    BondingModule,
    ErigibleModule,
    AuthModule,
    UniversityModule,

    /*MailerModule.forRoot({
      transport: {
          host: process.env.EMAIL_HOST, 
          port: 465, 
          secure: true, 
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
      },
      defaults: {
          from: '"No Reply" <chonchobeg7@gmail.com>',
      },
      template: {
          dir: __dirname + '/templates/',
          adapter: new HandlebarsAdapter(),
          options: {
              strict: true,
          },
      },
  }),

    mailerModule,  */
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
