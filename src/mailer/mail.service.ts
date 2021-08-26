import { Injectable } from '@nestjs/common';
import { InjectMailer, Mailer, template } from 'nestjs-mailer';

@Injectable()
export class MailService {
  constructor(@InjectMailer() private readonly mailer: Mailer) {}

  async activateUser(hashCode: string) {
    this.mailer
      .sendMail({
        from: '"Resume Maker" <pecheritsa.vv@gmail.com>',
        to: 'pecheritsa_vv@ukr.net',
        subject: 'Confirm Account ✔',
        text: 'Hello my friend :)',
        html: template('./public/config-account.hbs', { hashCode }),
      })
      .catch((e) => console.log(e));
  }
}
