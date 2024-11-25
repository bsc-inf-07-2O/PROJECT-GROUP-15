import { MailerService } from '@nestjs-modules/mailer';
import { User } from '../users/Student.entity';
export declare class EmailService {
    private mailerService;
    constructor(mailerService: MailerService);
    sendWelcomeEmail(user: User): Promise<void>;
    sendBondingSuccessEmail(user: User): Promise<void>;
}
