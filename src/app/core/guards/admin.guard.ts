import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

export const adminGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');

  if (token) {
    try {
      const decodedToken: any = jwtDecode(token);

      // Verifica se o token tem o atributo 'role'
      if (decodedToken.role) {
        return true;  // Acesso permitido
      } else {
        const router = inject(Router);
        router.navigate(['/acesso-negado']);  // Redireciona para acesso negado
        return false;
      }
    } catch (error) {
      console.error('Erro ao decodificar o token', error);
      const router = inject(Router);
      router.navigate(['/login']);  // Redireciona para login se o token for inválido
      return false;
    }
  } else {
    const router = inject(Router);
    router.navigate(['/login']);  // Redireciona para login se não houver token
    return false;
  }
};
