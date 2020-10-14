import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { EditorDocumentPageInstanceData } from '../tokens/classes/editor-document-page-instance-data.class';

@Injectable()
export class EditorDocumentPageInstanceService {
  public data: EditorDocumentPageInstanceData;
  public dataChanged = new BehaviorSubject<EditorDocumentPageInstanceData>(undefined);

  public setData(data?: EditorDocumentPageInstanceData): void {
    this.data = data;
    this.dataChanged.next(this.data);
  }
}
