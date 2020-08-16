import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { EditorDocumentPagedResultOutput, FeedServiceProxy } from '../client/webook';

@Injectable()
export class FeedService {

  constructor(private proxy: FeedServiceProxy) { }

  public getFeed(skipCount?: number, pageSize?: number): Observable<EditorDocumentPagedResultOutput> {
    return this.proxy.feedGet(skipCount, pageSize);
  }
}
