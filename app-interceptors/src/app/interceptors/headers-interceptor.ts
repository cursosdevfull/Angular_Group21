import { HttpInterceptorFn } from '@angular/common/http';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  const headers = req.headers
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .set('Cache-Control', 'no-cache')

  const clonedRequest = req.clone({ headers });

  return next(clonedRequest);
};
