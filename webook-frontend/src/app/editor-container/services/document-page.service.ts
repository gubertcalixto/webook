import { Injectable } from '@angular/core';
import html2canvas from 'html2canvas';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { debounceTime, first } from 'rxjs/operators';

import { DocumentInstanceServiceProxy, DocumentPageOutput, DocumentSavePageInput } from '../../client/webook';
import { EditorElementHistoryData } from '../tokens/classes/history/editor-history-pre-serialize.class';

interface IDocumentPageSaveData {
  editorDocumentId: string;
  pageNumber: number;
  content: string;
}
export type DocumentPageSaveStatus = 'waitingDebounce' | 'saved' | 'saving';

@Injectable()
export class EditorDocumentPageService {
  static debounceTimeToSave = 1000; // 1s

  private savePageSubject = new Subject<IDocumentPageSaveData>();
  public savedPageSubject = new Subject<void>();
  public pageSaveStatus: DocumentPageSaveStatus = 'saved';
  public pageSaveStatusSubject = new BehaviorSubject<DocumentPageSaveStatus>('saved');

  constructor(private documentInstanceService: DocumentInstanceServiceProxy) {
    this.savePageSubject
      .pipe(debounceTime(EditorDocumentPageService.debounceTimeToSave))
      .subscribe((data: IDocumentPageSaveData) => {
        this.doSave(data);
      })
  }

  public emitPageSaveStatus(status: DocumentPageSaveStatus) {
    if (this.pageSaveStatus === status) { return; }
    this.pageSaveStatus = status;
    this.pageSaveStatusSubject.next(status);
  }

  public getPage(documentId: string, pageNumber: number): Observable<DocumentPageOutput> {
    return this.documentInstanceService.documentDocumentIdPagePageNumberGet(documentId, pageNumber);
  }

  public savePage(editorDocumentId: string, pageNumber: number, content?: EditorElementHistoryData[]): void {
    this.emitPageSaveStatus('waitingDebounce');
    this.savePageSubject.next({
      editorDocumentId,
      pageNumber,
      content: JSON.stringify(content)
    });
  }

  private async doSave(data: IDocumentPageSaveData): Promise<void> {
    this.emitPageSaveStatus('saving');
    const thumbnail = data.pageNumber === 1
      ? await this.getThumbnailImage()
      : undefined;
    const input: DocumentSavePageInput = {
      editorDocumentId: data.editorDocumentId,
      pageNumber: data.pageNumber,
      pageData: data.content,
      pageThumbnail: thumbnail
    };
    this.documentInstanceService.documentPagePost(input)
      .pipe(first())
      .subscribe(() => {
        this.savedPageSubject.next();
        this.emitPageSaveStatus('saved');
      });
  }

  private getThumbnailImage(): Promise<string> {
    const editorContainerElement = document.querySelector('wb-editor') as HTMLElement;
    if (editorContainerElement == null) { return undefined; }
    return html2canvas(editorContainerElement, {
      ignoreElements: (el) => {
        let shouldIgnore = false;
        const elementsToIgnoreTags = ['ngx-selecto'];
        const elTagName = el.tagName.toUpperCase();
        for (let i = 0; i < elementsToIgnoreTags.length; i++) {
          const tagName = elementsToIgnoreTags[i].toUpperCase();
          shouldIgnore = elTagName === tagName;
          if (shouldIgnore) {
            break;
          }
        }
        return shouldIgnore;
      }
    }).then(result => {
      return result.toDataURL();
    }).catch(error => {
      return undefined;
    })
  }
}
