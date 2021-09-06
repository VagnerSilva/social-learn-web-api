import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from '../user/user.schema';

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}

  sendRecoverPasswordEmail(user: User, recoverToken: string) {
    this.mailerService.sendMail({
      from: process.env.EMAIL_FROM,
      to: user.email,
      subject: 'Recuperação de senha',
      template: './recovery_password',
      context: {
        token: recoverToken,
      },
    });
  }
}
