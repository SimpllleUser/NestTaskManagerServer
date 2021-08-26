import { Controller, Get } from '@nestjs/common';
import { InjectMailer, Mailer, template } from 'nestjs-mailer';

@Controller('mailer')
export class MailController {
  constructor(@InjectMailer() private readonly mailer: Mailer) {}

  @Get()
  async getHello() {
    this.mailer
      .sendMail({
        from: '"Resume Maker" <pecheritsa.vv@gmail.com>',
        to: 'pecheritsa_vv@ukr.net',
        subject: 'Confirm Account ✔',
        text: 'Hello my friend :)',
        html: template('./public/config-account.hbs', { name: 'John' }),
      })
      .catch((e) => console.log(e));
  }
}
