import { ContactFormServiceProxy } from './contactFormServiceProxy';
import { DocumentServiceProxy } from './documentServiceProxy';
import { DocumentsServiceProxy } from './documentsServiceProxy';
import { ProfileServiceProxy } from './profileServiceProxy';
import { UserPreferencesServiceProxy } from './userPreferencesServiceProxy';

export * from './contactFormServiceProxy';
export * from './documentServiceProxy';
export * from './documentsServiceProxy';
export * from './profileServiceProxy';
export * from './userPreferencesServiceProxy';
export const APIS = [ContactFormServiceProxy, DocumentServiceProxy, DocumentsServiceProxy, ProfileServiceProxy, UserPreferencesServiceProxy];
