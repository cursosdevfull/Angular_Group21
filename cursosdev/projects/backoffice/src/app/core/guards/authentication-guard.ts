import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authenticationGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = sessionStorage.getItem('accessToken');
  if (!token) {
    router.navigate(['/login']);
  }
  return !!token;
};
