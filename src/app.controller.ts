import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { InjectMailer, Mailer, template } from 'nestjs-mailer';
@Controller('/mailer')
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectMailer() private readonly mailer: Mailer,
  ) {}

  @Get()
  async getHello() {
    this.mailer
      .sendMail({
        from: '"Vitalii" <pecehritsa_vv@ukr.net>',
        to: 'raybek11@gmail.com',
        subject: 'Hello ✔',
        text: 'Hello John',
        html: template('./public/hello.hbs', { name: 'John' }),
      })
      .catch((e) => console.log(e));
    return { test: ' test' };
  }
}
