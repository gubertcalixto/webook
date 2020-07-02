import { AuthConfig } from 'angular-oauth2-oidc';

export const oAuthConfig: AuthConfig = {
  issuer: 'http://localhost:5000',
  redirectUri: `${window.location.origin}/home`,
  postLogoutRedirectUri: `${window.location.origin}/welcome`,
  clientId: 'webook-frontend',
  scope: 'openid profile webook-backend',
  requireHttps: false,
  clearHashAfterLogin: false,
  useSilentRefresh: true,
  silentRefreshRedirectUri: window.location.origin + '/assets/oauth/silent-refresh.html',
  showDebugInformation: true
};
