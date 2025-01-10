import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const redirectIfLoggedGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const loggedUser = localStorage.getItem('loggedUser');
  if (loggedUser) {
    return router.parseUrl('/dashboard');
  }
  return true;
};
