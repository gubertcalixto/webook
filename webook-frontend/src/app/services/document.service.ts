import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {
  DocumentServiceProxy,
  DocumentsServiceProxy,
  EditorDocument,
  EditorDocumentAllowedAccess,
  EditorDocumentPagedResultOutput,
  Tags,
} from '../client/webook';

@Injectable()
export class DocumentService {
  constructor(
    private documentServiceProxy: DocumentServiceProxy,
    private documentsServiceProxy: DocumentsServiceProxy
  ) { }

  public createDocument(title?: string, description?: string, allowedAccess?: EditorDocumentAllowedAccess, id?: string)
    : Observable<EditorDocument> {
    return this.documentServiceProxy.documentPost(title, id, description, allowedAccess);
  }

  public getMyDocuments(searchQuery?: string): Observable<EditorDocument[]> {
    return this.documentsServiceProxy.documentsMyUserGet(searchQuery);
  }

  public getAllDocuments(input: {
    userName?: string; tagFilter?: string[]; rate?: number; startDate?: string; endDate?: string; skipCount?: number; pageSize?: number; filter?: string; order?: string
  }): Observable<EditorDocumentPagedResultOutput> {
    return this.documentsServiceProxy.documentsSearchGet(input.userName, input.tagFilter, input.rate, input.startDate, input.endDate, input.skipCount, input.pageSize, input.filter, input.order);
  }

  public getUserDocuments(userId: string, skipCount?: number, pageSize?: number, filter?: string): Observable<EditorDocumentPagedResultOutput> {
    return this.documentsServiceProxy.documentsUserUserIdGet(userId, skipCount, pageSize, filter);
  }

  public getDocument(id: string): Observable<EditorDocument> {
    return this.documentServiceProxy.documentIdGet(id);
  }

  public deleteDocument(id: string) {
    return this.documentServiceProxy.documentIdDelete(id);
  }

  public deleteAllMyDocument() {
    return this.documentsServiceProxy.documentsMyUserDelete();
  }

  public updateTitle(id: string, title: string): Observable<string> {
    return this.documentServiceProxy.documentIdTitlePost(title, id);
  }

  public updateDocument(id: string, title?: string, description?: string, allowedAccess?: EditorDocumentAllowedAccess, tags?: Array<Tags>)
    : Observable<EditorDocument> {
    return this.documentServiceProxy.documentIdPost(id, {
      id,
      title,
      description,
      allowedAccess,
      tags
    });
  }
}
