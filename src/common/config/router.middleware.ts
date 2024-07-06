import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class RouterMiddleware implements NestMiddleware {
  private logger = new Logger('Route');

  use(request: Request, response: Response, next: NextFunction): void {
    const { method, originalUrl } = request;

    response.on('finish', () => {
      const { statusCode } = response;
      this.logger.verbose(`${method} ${originalUrl} (${statusCode})`);
    });

    next();
  }
}
