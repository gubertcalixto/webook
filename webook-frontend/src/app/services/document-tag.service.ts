import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { DocumentTagServiceProxy } from '../client/webook';

@Injectable()
export class DocumentTagService {
  constructor(private documentTagServiceProxy: DocumentTagServiceProxy) { }

  public searchTags(tagName: string, skipCount?: number, pageSize?: number): Observable<string[]> {
    return this.documentTagServiceProxy.documentsTagsGet(tagName, skipCount, pageSize);
  }
}
