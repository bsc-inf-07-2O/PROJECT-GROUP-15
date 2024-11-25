import { Global, Module } from '@nestjs/common';
import { EmailService } from './mailer.service';
import { MailerModule as NestMailerModule } from '@nestjs-modules/mailer'; // Import NestMailerModule
// import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
@Global()
@Module({
  imports: [
    NestMailerModule.forRoot({
      transport: {
        service: 'gmail',
        port: 465,
        secure: true,
        auth: {
          user: 'bsc-inf-07-20@unima.ac.mw',
          pass: 'xgfjwwgorxecmssw',
        },
      },
      defaults: {
        from: 'No Reply bsc-inf-07-20@unima.ac.mw',
      },
      // template: {
      //   dir: __dirname + '/templates/',
      //   adapter: new HandlebarsAdapter(),
      //   options: {
      //     strict: true,
      //   },
      // },
    }),
  ],
  providers: [EmailService],
  exports: [EmailService], // Export EmailService for use in other modules
})
export class CustomMailerModule {}
