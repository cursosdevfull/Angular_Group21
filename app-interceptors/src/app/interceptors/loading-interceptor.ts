import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Loading } from '../loading';
import { delay, finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  console.log("Loading started");
  const loading = inject(Loading)

  loading.start();


  return next(req)
    .pipe(
      delay(5000),
      finalize(() => {
        loading.stop()
      })
    )
    ;
};
