import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from '../user/user.schema';

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}

  sendRecoverPasswordEmail(user: User) {
    this.mailerService.sendMail({
      from: process.env.EMAIL_FROM,
      to: user.email,
      subject: 'Recovery password',
      template: './recovery_password',
      context: {
        token: user.recoverToken,
        domain: process.env.HOST_DOMAIN,
      },
    });
  }
}
