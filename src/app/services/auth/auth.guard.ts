import { Injectable } from '@angular/core'
import { CanActivate, Router } from '@angular/router'
import { AuthService } from './auth.service'

@Injectable()
export class AuthGuard implements CanActivate {

    isAuthenticated = false;

    constructor(
      private authService: AuthService,
      private router: Router
    ) {}

    async canActivate() {
      const currentUser = this.authService.currentUserValue;
      if (currentUser) {
          // authorised so return true
          return true;
      }

      // not logged in so redirect to login page with the return url
      this.router.navigate(['']);
      return false;
    }
}
