import { HttpInterceptorFn } from '@angular/common/http';
import { max, retry } from 'rxjs';

export const retryInterceptor: HttpInterceptorFn = (req, next) => {
  const maxRetries = 3;

  return next(req).pipe(retry(maxRetries));
};
