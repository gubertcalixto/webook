import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { OauthManagerService } from '../../services/oauth-manager.service';

@Injectable()
export class MustBeUnLoggedAuthGuard implements CanActivate {
  constructor(private router: Router, private authService: OauthManagerService) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const shouldActivate = !(await this.authService.hasValidToken().toPromise());
    if (!shouldActivate) {
      this.router.navigateByUrl('/home');
    }
    return shouldActivate;
  }
}
