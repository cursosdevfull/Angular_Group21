import { HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs';

export const requestTimingInterceptor: HttpInterceptorFn = (req, next) => {
  const startTime = Date.now();

  return next(req).pipe(
    tap(() => {
      const elapsedTime = Date.now() - startTime;
      console.log(`Request to ${req.url} took ${elapsedTime} ms`);
    })
  );
};
