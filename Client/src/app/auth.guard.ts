import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router
  ) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    console.log('auth guard', localStorage.getItem('MYAPP_USER'));

    if (!localStorage.getItem('MYAPP_USER')) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

  isLoggedIn() {
    if(localStorage.getItem('MYAPP_USER')){
      this.router.navigate(['dashboard']);
    }
  }
}
