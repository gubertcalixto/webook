import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { EditorDocument } from 'src/app/client/webook';
import { DocumentService } from 'src/app/services/document.service';
import { RouterHistoryService } from 'src/app/setup/router-history.service';

import { EditorPageService } from '../editor-page/editor-page.service';

@Component({
  selector: 'wb-document-view-page',
  templateUrl: './document-view-page.component.html',
  styleUrls: ['./document-view-page.component.scss']
})
export class DocumentViewPageComponent implements OnDestroy {
  private subs: Subscription[] = [];
  public document: EditorDocument;
  public documentId: string;
  public pageIndex = 1;

  constructor(
    private routerHistoryService: RouterHistoryService,
    private activatedRoute: ActivatedRoute,
    private documentService: DocumentService,
    private editorPageService: EditorPageService,
  ) {
    this.activatedRoute.params.subscribe(params => {
      const documentId = params.id;
      if (!documentId) {
        this.redirectBack();
        return;
      }
      this.documentId = documentId;
      this.getDocument();
    });

    this.subs.push(this.editorPageService.documentChangedSubject.subscribe(() => {
      this.getDocument();
    }));
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  public redirectBack(): void {
    this.routerHistoryService.navigateBack();
  }

  private getDocument(): void {
    this.subs.push(this.documentService.getDocument(this.documentId).subscribe(document => {
      if (!document) {
        this.redirectBack();
        return;
      }
      this.document = document;
    },
      () => {
        this.redirectBack();
      }));
  }
}
