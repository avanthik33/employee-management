import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const loggedUser = localStorage.getItem('loggedUser');
  if (!loggedUser) {
    return router.parseUrl('/login');
  }
  return true;
};
