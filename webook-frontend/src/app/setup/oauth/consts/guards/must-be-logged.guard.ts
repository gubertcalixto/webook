import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { OauthManagerService } from '../../services/oauth-manager.service';

@Injectable()
export class MustBeLoggedAuthGuard implements CanActivate {
  constructor(private router: Router, private authService: OauthManagerService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const hasAccess = this.authService.hasValidToken();
    // TODO
    // if (!hasAccess) {
    //   this.router.navigateByUrl('/welcome');
    // }
    return hasAccess;
  }
}
