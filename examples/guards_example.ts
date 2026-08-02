import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Router } from 'express';

export const authGuard: CanActivateFn = (route, state) => {
  //Se inyectan dependencias
  const authService = inject(AuthService);
  const router = inject(Router);

  //Logica de desición
  if(authService.isAuthenticated()) {
    return true;
  }

  return router.createUrlTree(['/login'],{ queryParams: { returnUrl: state.url }});
};
