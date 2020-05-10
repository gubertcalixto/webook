import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';

import { OauthManagerService } from '../../services/oauth-manager.service';

@Injectable()
export class MustBeLoggedAuthGuard implements CanActivate {
  constructor(private authService: OauthManagerService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authService.hasValidToken();
  }
}
