import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../environment';

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
    const baseUrl = environment.apiUrl

    console.log('Base URL Interceptor:', baseUrl);
    console.log('Request URL:', req.url);

    const clonedRequest = req.clone({
        url: `${baseUrl}${req.url}`
    })

    return next(clonedRequest);
};