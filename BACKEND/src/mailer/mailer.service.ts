import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from '../users/Student.entity';

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}

  async sendWelcomeEmail(user: User) {
    await this.mailerService.sendMail({
      to: user.email,
      from: '"Loans Board" <bsc-inf-07-20@unima.ac.mw>',
      subject: 'Welcome to Our Site!',
      text: 'Hello, thank you for registering with us!',
    });
  }

  async sendBondingSuccessEmail(user: User) {
    await this.mailerService.sendMail({
      to: user.email,
      from: '"Loans Board" <bsc-inf-07-20@unima.ac.mw>',
      subject: 'Bonding Process Successful',
      text: 'Congratulations! Your bonding process was successful.',
    });
  }
}
