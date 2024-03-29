import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
export declare class AppResultInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): import("rxjs").Observable<{
        result: any;
    }>;
}
