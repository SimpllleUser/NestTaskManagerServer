import { Module } from '@nestjs/common';

import { MailController } from './mail.controller';

@Module({
  providers: [MailController],
  controllers: [MailController],
})
export class MailModule {}
