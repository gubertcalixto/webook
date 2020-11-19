import { AuthConfig } from 'angular-oauth2-oidc';

export const oAuthConfig: AuthConfig = {
  // TODO Set production issuer
  issuer: 'https://localhost:5000',
  redirectUri: `${window.location.origin}/welcome`,
  postLogoutRedirectUri: `${window.location.origin}/welcome`,
  clientId: 'webook-frontend',
  scope: 'openid profile webook-backend',
  requireHttps: true,
  clearHashAfterLogin: true,
  useSilentRefresh: true,
  silentRefreshRedirectUri: window.location.origin + '/assets/oauth/silent-refresh.html',
  showDebugInformation: false
};
