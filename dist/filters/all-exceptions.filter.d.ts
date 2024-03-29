import 'dotenv/config';
import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
export declare class AllException implements ExceptionFilter {
    private readonly logger;
    constructor();
    catch(exception: Error, host: ArgumentsHost): any;
}
