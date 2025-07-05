import { HttpInterceptorFn } from '@angular/common/http';
import { timeout, catchError, throwError, delay } from 'rxjs';

export const timeoutInterceptor: HttpInterceptorFn = (req, next) => {
  const timeoutDuration = 10 * 1000

  return next(req).pipe(
    delay(1000),
    timeout(timeoutDuration),
    catchError(error => {
      if (error.name === 'TimeoutError') {
        console.error('Request timed out after', timeoutDuration, 'milliseconds');
        return throwError(() => new Error('Request timed out'));
      }
      return throwError(() => error);
    })
  )
};
