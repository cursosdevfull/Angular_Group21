import { HttpInterceptorFn } from '@angular/common/http';
import { throwError } from 'rxjs';

export const offlineModeInterceptor: HttpInterceptorFn = (req, next) => {
  if (!navigator.onLine) {
    console.warn('Offline mode: Request blocked', req.url);
    return throwError(() => new Error('Network request failed: Offline mode'));
  }

  return next(req);
};
