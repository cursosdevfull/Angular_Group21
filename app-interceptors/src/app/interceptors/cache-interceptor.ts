import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Cache } from '../cache';
import { of, tap } from 'rxjs';

export const cacheInterceptor: HttpInterceptorFn = (req, next) => {
  const cacheService = inject(Cache)

  if (req.method !== 'GET') {
    return next(req);
  }

  //const cacheResponse = cacheService.cache.get(req.url)
  const cacheResponse = localStorage.getItem(req.url)

  if (cacheResponse) {
    console.log("Cache Hit:", req.url);
    const parsedResponse = JSON.parse(cacheResponse);
    return of(new HttpResponse(parsedResponse));
  }


  return next(req).pipe(
    tap(evt => {
      if (evt instanceof HttpResponse) {
        console.log("Cache Miss:", req.url);
        //cacheService.cache.set(req.url, evt);
        localStorage.setItem(req.url, JSON.stringify(evt));
      }
    })
  )
}
