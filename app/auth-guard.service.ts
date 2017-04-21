/**
 * Created by ska on 7/27/16.
 */
import { Injectable }             from '@angular/core';
import { CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot }    from '@angular/router';
import { AuthService }            from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.isUrlPathAuthorized(route.url)) { return true; }
    console.log("AuthGuard: Not Logged In");
    // Store the attempted URL for redirecting
    this.authService.redirectUrl = state.url;

    // Navigate to the login page
    this.router.navigate(['/Login']);
    return false;
  }

  isPathAuthorized(path){
    if (this.authService.isLoggedIn) { return true; }
    return false;
  }

  isUrlPathAuthorized(path){
    if (this.authService.isLoggedIn) { return true; }
    return false;
  }
}
