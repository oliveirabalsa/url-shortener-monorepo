import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HtmlExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const message =
      exception instanceof HttpException ? exception.getResponse() : exception;
    if (
      request.headers.accept &&
      request.headers.accept.includes('text/html')
    ) {
      response.status(status).send(`
        <html>
          <head><title>Error ${status}</title></head>
          <body>
            <h1>Error ${status}</h1>
            <p>${JSON.stringify(message)}</p>
          </body>
        </html>
      `);
    } else {
      response.status(status).json({ statusCode: status, message });
    }
  }
}
