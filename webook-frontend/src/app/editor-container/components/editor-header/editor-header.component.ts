import { Component, EventEmitter, Input, OnDestroy, Output, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { DocumentOutput, EditorObjectTypeEnum, HasLikeOrDislikeOutputEnum } from 'src/app/client/webook';

import { EditorDocumentPageService } from '../../services/document-page.service';
import { LikeService } from '../../services/interactions/like.service';
import { IEditorExternalEvent } from '../../tokens/classes/editor-external-event.interface';
import {
  EditorInteractionsBaseElement,
} from '../editor/editor-components/editor-element-base-classes/editor-interactions-base-element';

@Component({
  selector: 'wb-editor-header',
  templateUrl: './editor-header.component.html',
  styleUrls: ['./editor-header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditorHeaderComponent implements OnDestroy {
  private subs: Subscription[] = [];
  public editorInteractionsBaseElement: EditorInteractionsBaseElement;
  private _pageIndex = 1;

  public hasCopiedLink: boolean;
  public pageSelectionExpanded = false;
  public pageSaveStatusLabel = new Map([
    ['saved', 'Documento salvo'],
    ['saving', 'Salvando documento...'],
    ['waitingDebounce', 'Aguardando Mudanças...']
  ]);

  @Input() public document: DocumentOutput;
  public doesDocumentHasLike: boolean;
  public doesDocumentHasDislike: boolean;
  public isLoadingLikeAndDislike = true;
  private hasAlreadyDoneLikeOrDislikeRequest: boolean;

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
    public documentPageService: EditorDocumentPageService,
    public likeService: LikeService
  ) { }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  ngAfterViewInit(): void {
    this.hasLikeOrDislikeForDocument();
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
      if (this?.hasCopiedLink){
        this.hasCopiedLink = false;
      }
    }, 3000);
  }

  private hasLikeOrDislikeForDocument(): void {
    this.hasAlreadyDoneLikeOrDislikeRequest = true;
    this.likeService.hasLikeOrDislike(EditorObjectTypeEnum.NUMBER_0, this.document.id)
      .pipe(first())
      .subscribe((result) => {
        this.hasAlreadyDoneLikeOrDislikeRequest = true;
        this.doesDocumentHasLike = result === HasLikeOrDislikeOutputEnum.NUMBER_0;
        this.doesDocumentHasDislike = result === HasLikeOrDislikeOutputEnum.NUMBER_1;
        this.isLoadingLikeAndDislike = false;
      }, () => {
        this.hasAlreadyDoneLikeOrDislikeRequest = false;
        this.isLoadingLikeAndDislike = false;
      });
  }

  public likeDocument(): void {
    this.likeService.like({ objectTypeEnum: EditorObjectTypeEnum.NUMBER_0, objectId: this.document.id })
      .pipe(first())
      .subscribe(() => {
        this.doesDocumentHasLike = true;
      });
  }

  public dislikeDocument(): void {
    this.likeService.dislike({ objectTypeEnum: EditorObjectTypeEnum.NUMBER_2, objectId: this.document.id })
      .pipe(first())
      .subscribe(() => {
        this.doesDocumentHasDislike = true;
      });
  }

  public removeLikeDocument(): void {
    this.likeService.removeLike(EditorObjectTypeEnum.NUMBER_0, this.document.id)
      .pipe(first())
      .subscribe(() => {
        this.doesDocumentHasLike = false;
      });
  }

  public removeDislikeDocument(): void {
    this.likeService.removeDislike(EditorObjectTypeEnum.NUMBER_0, this.document.id)
      .pipe(first())
      .subscribe(() => {
        this.doesDocumentHasDislike = false;
      });
  }
}
