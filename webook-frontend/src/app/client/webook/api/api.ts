export * from './documentServiceProxy';
import { DocumentServiceProxy } from './documentServiceProxy';
export * from './documentsServiceProxy';
import { DocumentsServiceProxy } from './documentsServiceProxy';
export * from './profileServiceProxy';
import { ProfileServiceProxy } from './profileServiceProxy';
export * from './userPreferencesServiceProxy';
import { UserPreferencesServiceProxy } from './userPreferencesServiceProxy';
export const APIS = [DocumentServiceProxy, DocumentsServiceProxy, ProfileServiceProxy, UserPreferencesServiceProxy];
