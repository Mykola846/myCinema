import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean | UrlTree {
    // если пользователь авторизован — пропускаем
    if (this.authService.isAuthenticated()) {
      return true;
    }

    // если нет — отправляем на логин
    return this.router.createUrlTree(['/login']);
  }
}
