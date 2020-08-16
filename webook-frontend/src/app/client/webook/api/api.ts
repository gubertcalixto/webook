export * from './contactFormServiceProxy';
import { ContactFormServiceProxy } from './contactFormServiceProxy';
export * from './documentServiceProxy';
import { DocumentServiceProxy } from './documentServiceProxy';
export * from './documentsServiceProxy';
import { DocumentsServiceProxy } from './documentsServiceProxy';
export * from './feedServiceProxy';
import { FeedServiceProxy } from './feedServiceProxy';
export * from './profileServiceProxy';
import { ProfileServiceProxy } from './profileServiceProxy';
export * from './userPreferencesServiceProxy';
import { UserPreferencesServiceProxy } from './userPreferencesServiceProxy';
export const APIS = [ContactFormServiceProxy, DocumentServiceProxy, DocumentsServiceProxy, FeedServiceProxy, ProfileServiceProxy, UserPreferencesServiceProxy];
