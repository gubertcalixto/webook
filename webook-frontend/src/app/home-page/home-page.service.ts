import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { DocumentServiceProxy, EditorDocument, EditorDocumentAllowedAccess } from '../client/webook';

@Injectable()
export class HomePageService {

  constructor(private documentServiceProxy: DocumentServiceProxy) { }

  public createDocument(title?: string, description?: string, allowedAccess?: EditorDocumentAllowedAccess, id?: string)
    : Observable<EditorDocument> {
    return this.documentServiceProxy.documentPost(title, id, description, allowedAccess);
  }

  public getMyDocuments(): Observable<EditorDocument[]> {
    return this.documentServiceProxy.documentsGet();
  }
}
