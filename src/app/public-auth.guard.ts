import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './shared/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PrivateAuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    console.log('PrivateAuthGuard executing...');
    if (!this.authService.isLoggedIn()) {
      console.log('User is not logged in. Allow access to login/register pages.');
      return true; // Allow access to the login/register pages for unauthenticated users
    } else {
      console.log('User is logged in. Redirect away from login/register pages.');
      this.router.navigate(['/private']); // Redirect logged-in users away from public pages
      return false;
    }
  }
}