import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';


import { CommentServiceProxy } from './api/commentServiceProxy';
import { ContactFormServiceProxy } from './api/contactFormServiceProxy';
import { DenounceDocumentServiceProxy } from './api/denounceDocumentServiceProxy';
import { DocumentServiceProxy } from './api/documentServiceProxy';
import { DocumentInstanceServiceProxy } from './api/documentInstanceServiceProxy';
import { DocumentTagServiceProxy } from './api/documentTagServiceProxy';
import { DocumentsServiceProxy } from './api/documentsServiceProxy';
import { FeedServiceProxy } from './api/feedServiceProxy';
import { LikeDislikeServiceProxy } from './api/likeDislikeServiceProxy';
import { NotificationServiceProxy } from './api/notificationServiceProxy';
import { ProfileServiceProxy } from './api/profileServiceProxy';
import { UserPreferencesServiceProxy } from './api/userPreferencesServiceProxy';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: [
    CommentServiceProxy,
    ContactFormServiceProxy,
    DenounceDocumentServiceProxy,
    DocumentServiceProxy,
    DocumentInstanceServiceProxy,
    DocumentTagServiceProxy,
    DocumentsServiceProxy,
    FeedServiceProxy,
    LikeDislikeServiceProxy,
    NotificationServiceProxy,
    ProfileServiceProxy,
    UserPreferencesServiceProxy ]
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders<ApiModule> {
        return {
            ngModule: ApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
