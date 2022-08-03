import { CallHandler, ExecutionContext, Injectable, NestInterceptor, NotFoundException } from "@nestjs/common";
import { catchError } from "rxjs";

@Injectable()
export class NotFoundInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): any {
    return next.handle()
      .pipe(catchError(error => {
        if (error) {
          throw new NotFoundException(error.message);
        } else {
          throw error;
        }
      }));
  }
}