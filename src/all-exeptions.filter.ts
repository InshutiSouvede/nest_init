import {
  Catch,
  ArgumentsHost,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { MyLoggerService } from './my-logger/my-logger.service';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';
import { BaseExceptionFilter } from '@nestjs/core';
import { Request, Response } from 'express';

type MyResponseObj = {
  statusCode: number;
  timestamp: string;
  path: string;
  response: string | object;
};

@Catch()
export class AllExeptionsFilter extends BaseExceptionFilter {
  private readonly logger = new MyLoggerService(AllExeptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const myResponseObject: MyResponseObj = {
      statusCode: 500,
      timestamp: new Date().toISOString(),
      path: request.url,
      response: '',
    };

    if (exception instanceof HttpException) {
      myResponseObject.statusCode = exception.getStatus();
      myResponseObject.response = exception.getResponse();
    } else if (exception instanceof PrismaClientValidationError) {
      myResponseObject.statusCode = 422;
      myResponseObject.response = exception.message.replaceAll(/\n\t/g, ' ');
    } else {
      myResponseObject.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      myResponseObject.response = 'Internal Server Error';
    }

    response.status(myResponseObject.statusCode).json(myResponseObject);
    this.logger.error(myResponseObject.response, AllExeptionsFilter.name);
    super.catch(exception, host);
  }
}
