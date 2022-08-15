import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
export declare class NotFoundInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): any;
}
