export * from './commentServiceProxy';
import { CommentServiceProxy } from './commentServiceProxy';
export * from './contactFormServiceProxy';
import { ContactFormServiceProxy } from './contactFormServiceProxy';
export * from './denounceDocumentServiceProxy';
import { DenounceDocumentServiceProxy } from './denounceDocumentServiceProxy';
export * from './documentServiceProxy';
import { DocumentServiceProxy } from './documentServiceProxy';
export * from './documentInstanceServiceProxy';
import { DocumentInstanceServiceProxy } from './documentInstanceServiceProxy';
export * from './documentTagServiceProxy';
import { DocumentTagServiceProxy } from './documentTagServiceProxy';
export * from './documentsServiceProxy';
import { DocumentsServiceProxy } from './documentsServiceProxy';
export * from './feedServiceProxy';
import { FeedServiceProxy } from './feedServiceProxy';
export * from './likeDislikeServiceProxy';
import { LikeDislikeServiceProxy } from './likeDislikeServiceProxy';
export * from './notificationServiceProxy';
import { NotificationServiceProxy } from './notificationServiceProxy';
export * from './profileServiceProxy';
import { ProfileServiceProxy } from './profileServiceProxy';
export * from './userPreferencesServiceProxy';
import { UserPreferencesServiceProxy } from './userPreferencesServiceProxy';
export const APIS = [CommentServiceProxy, ContactFormServiceProxy, DenounceDocumentServiceProxy, DocumentServiceProxy, DocumentInstanceServiceProxy, DocumentTagServiceProxy, DocumentsServiceProxy, FeedServiceProxy, LikeDislikeServiceProxy, NotificationServiceProxy, ProfileServiceProxy, UserPreferencesServiceProxy];
