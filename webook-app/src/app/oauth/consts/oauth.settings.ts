import { AuthConfig } from 'angular-oauth2-oidc';

export const oAuthConfig: AuthConfig = {
  issuer: 'http://localhost:5000',
  redirectUri: window.location.origin,
  clientId: 'webook-frontend',
  scope: 'openid profile',
  requireHttps: false,
  clearHashAfterLogin: true,
  useSilentRefresh: true,
  silentRefreshRedirectUri: window.location.origin + '/assets/oauth/silent-refresh.html',
  showDebugInformation: true
};
