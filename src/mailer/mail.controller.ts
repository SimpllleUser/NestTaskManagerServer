import { Controller, Get } from '@nestjs/common';

@Controller('mailer')
export class MailController {
  @Get()
  async getHello() {
    return { test: 'Not found  :(' };
  }
}
