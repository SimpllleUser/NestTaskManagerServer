import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
@Controller('/mailer')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello() {
    return { test: ' test' };
  }
}
