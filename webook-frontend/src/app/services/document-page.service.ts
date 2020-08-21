import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, first } from 'rxjs/operators';

import { DocumentInstanceServiceProxy, DocumentPageOutput, DocumentSavePageInput } from '../client/webook';
import { EditorElementHistoryData } from '../editor-container/tokens/classes/history/editor-history-pre-serialize.class';

interface IDocumentPageSaveData {
  editorDocumentId: string;
  pageNumber: number;
  content: string;
}

@Injectable()
export class EditorDocumentPageService {
  static debounceTimeToSave = 1000; // 1s

  private savePageSubject = new Subject<IDocumentPageSaveData>();
  public savedPageSubject = new Subject<void>();

  constructor(private documentInstanceService: DocumentInstanceServiceProxy) {
    this.savePageSubject
      .pipe(debounceTime(EditorDocumentPageService.debounceTimeToSave))
      .subscribe((data: IDocumentPageSaveData) => {
        this.doSave(data);
      })
  }

  public getPage(documentId: string, pageNumber: number): Observable<DocumentPageOutput> {
    return this.documentInstanceService.documentDocumentIdPagePageNumberGet(documentId, pageNumber);
  }

  public savePage(editorDocumentId: string, pageNumber: number, content?: EditorElementHistoryData[]): void {
    this.savePageSubject.next({
      editorDocumentId,
      pageNumber,
      content: JSON.stringify(content)
    });
  }

  private doSave(data: IDocumentPageSaveData): void {
    const input: DocumentSavePageInput = {
      editorDocumentId: data.editorDocumentId,
      pageNumber: data.pageNumber,
      pageData: data.content
    };
    this.documentInstanceService.documentPagePost(input)
      .pipe(first())
      .subscribe(() => {
        this.savedPageSubject.next();
      });
  }
}
