import { Component, EventEmitter, Input, OnDestroy, Output, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { DocumentOutput } from 'src/app/client/webook';

import { EditorDocumentPageService } from '../../services/document-page.service';
import { IEditorExternalEvent } from '../../tokens/classes/editor-external-event.interface';

@Component({
  selector: 'wb-editor-header',
  templateUrl: './editor-header.component.html',
  styleUrls: ['./editor-header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditorHeaderComponent implements OnDestroy {
  private subs: Subscription[] = [];
  private _pageIndex = 1;

  public hasCopiedLink: boolean;
  public pageSelectionExpanded = false;
  public pageSaveStatusLabel = new Map([
    ['saved', 'Documento salvo'],
    ['saving', 'Salvando documento...'],
    ['waitingDebounce', 'Aguardando Mudanças...']
  ]);

  @Input() public document: DocumentOutput;

  @Input() public get pageIndex() { return this._pageIndex; }
  public set pageIndex(value) {
    this._pageIndex = value;
    this.pageIndexChange.next(value);
  }
  @Input() public showPageSaveStatus = true;
  @Input() public visualizeMode = false;
  @Input() public editorExternalEvent: IEditorExternalEvent;
  @Output() public pageIndexChange = new EventEmitter<number>();
  @Output() public redirectBack = new EventEmitter<void>();
  @Output() public openDocumentConfiguration = new EventEmitter<void>();
  @Output() public openDenounceModal = new EventEmitter<void>();

  public get pageTotalCount(): number {
    return this.document?.pageNumber || 1;
  }

  constructor(
    public documentPageService: EditorDocumentPageService
  ) { }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  public emitToAddPage(): void {
    if (this.document) {
      this.document.pageNumber += 1;
    }
    this.pageIndex += 1;
  }

  public onBackButtonClick(): void {
    if (this.documentPageService.pageSaveStatus === 'saved') {
      this.redirectBack.next();
    }
  }

  public deletePage(pageNumber: number): void {
    this.documentPageService.deletePage(this.document.id, pageNumber).pipe(first()).subscribe(() => {
      if (this.pageIndex !== 1) {
        this.pageIndex -= 1;
      } else {
        this.pageIndex = 1;
      }
      this.document.pageNumber -= 1;
    });
  }

  public copyLinkToClipboard(): void {
    this.hasCopiedLink = true;
    navigator.clipboard.writeText(`${location.origin}/document/${this.document.id}/view` );
    setTimeout(() => {
      if(this?.hasCopiedLink){
        this.hasCopiedLink = false;
      }
    }, 3000)
  }
}
