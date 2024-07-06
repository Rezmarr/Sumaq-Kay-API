import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  private readonly kafkaError =
    'The client consumer did not ' +
    'subscribe to the corresponding reply topic';

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      catchError((err) => {
        return throwError(() => this.handleException(err));
      })
    );
  }

  private handleException(err: any): HttpException {
    try {
      console.log('err:', err);

      if (err.status === 'error')
        return new HttpException(
          'Algo salió mal, inténtelo más tarde',
          HttpStatus.BAD_GATEWAY
        );

      let error = err.message;

      if (err.error) {
        error = err.error;
      }

      if (err.response) {
        error = err.response;
      }

      if (
        typeof error === 'string' &&
        error?.toLowerCase().includes(this.kafkaError.toLowerCase())
      ) {
        error =
          'Vaya, parece que hubo un inconviente en nuestro servicio, ' +
          'por favor, dale clic al botón de "Reintentar"';
      }

      return new HttpException(
        error ?? 'Algo salió mal, inténtelo más tarde',
        err.status ?? HttpStatus.INTERNAL_SERVER_ERROR
      );
    } catch {
      return new HttpException(
        'Algo salió mal, inténtelo más tarde',
        HttpStatus.BAD_GATEWAY
      );
    }
  }
}
