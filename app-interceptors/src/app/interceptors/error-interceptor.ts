import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.log('Error Interceptor:', error.message);
      console.log("Error Interceptor Detail", error);

      return throwError(() => {
        new Error(`Error occurred: ${error.status} - ${error.message}`)
      })
    })
  )
};
