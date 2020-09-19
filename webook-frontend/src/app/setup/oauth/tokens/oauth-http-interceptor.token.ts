import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OauthManagerService } from '@oath/services/oauth-manager.service';
import { Observable } from 'rxjs';

@Injectable()
export class OAuthHttpInterceptor implements HttpInterceptor {
  constructor(private oauthManagerService: OauthManagerService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessTokenExpirationAsString = localStorage.getItem('expires_at');
    if (
      !accessTokenExpirationAsString
      || new Date() > new Date(accessTokenExpirationAsString)
      || !this.oauthManagerService.accessToken
    ) {
      return next.handle(request);
    }
    const dupReq = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${this.oauthManagerService.accessToken}`),
    });
    return next.handle(dupReq);
  }
}
