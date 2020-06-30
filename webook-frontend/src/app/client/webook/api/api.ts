export * from './contactFormServiceProxy';
import { ContactFormServiceProxy } from './contactFormServiceProxy';
export * from './documentServiceProxy';
import { DocumentServiceProxy } from './documentServiceProxy';
export * from './documentsServiceProxy';
import { DocumentsServiceProxy } from './documentsServiceProxy';
export * from './profileServiceProxy';
import { ProfileServiceProxy } from './profileServiceProxy';
export const APIS = [ContactFormServiceProxy, DocumentServiceProxy, DocumentsServiceProxy, ProfileServiceProxy];
