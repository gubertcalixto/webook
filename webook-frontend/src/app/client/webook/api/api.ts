export * from './documentServiceProxy';
import { DocumentServiceProxy } from './documentServiceProxy';
export * from './documentsServiceProxy';
import { DocumentsServiceProxy } from './documentsServiceProxy';
export * from './profileServiceProxy';
import { ProfileServiceProxy } from './profileServiceProxy';
export const APIS = [DocumentServiceProxy, DocumentsServiceProxy, ProfileServiceProxy];
