import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { map, tap } from 'rxjs';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req)
    .pipe(
      tap(evt => {
        if (evt instanceof HttpResponse) {
          console.log('Logging Interceptor:', evt);
        }
      }),
      /*       map((evt: HttpResponse<any>) => {
              evt.body.map((item: any) => item.body)
            }) */
    )
};
