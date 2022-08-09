import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationException } from '../exceptions/validation.exception';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    const object = plainToClass(metadata.metatype, value);
    const errors = await validate(object);
    console.log(JSON.stringify(errors, null ,4))
    if (errors.length)
      throw new ValidationException(
        errors.map(
          (error) =>
            `${error.property} => ${Object.values(error.constraints).join(
              ', ',
            )}`,
        ).join(', '),
      );
    return value;
  }
}
