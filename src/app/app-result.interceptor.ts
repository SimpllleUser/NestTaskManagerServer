import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { log } from 'console';
import { tap, map } from 'rxjs/operators';

@Injectable()
export class AppResultInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(map((res) => ({ result: res })));
  }
}