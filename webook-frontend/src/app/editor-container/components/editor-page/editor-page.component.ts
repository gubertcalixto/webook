import { Component, OnDestroy, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Subscription } from 'rxjs';
import { EditorDocument } from 'src/app/client/webook';
import { DocumentService } from 'src/app/services/document.service';

import {
  EditorConfigurationModalComponent,
} from '../editor-configuration/editor-configuration-modal/editor-configuration-modal.component';
import { EditorPageService } from './editor-page.service';

@Component({
  selector: 'wb-editor-page',
  templateUrl: './editor-page.component.html',
  styleUrls: ['./editor-page.component.scss']
})
export class EditorPageComponent implements OnDestroy {
  private subs: Subscription[] = [];
  public document: EditorDocument;
  public documentId: string;
  public pageIndex = 1;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private documentService: DocumentService,
    private editorPageService: EditorPageService,
    private nzModalService: NzModalService,
    private viewContainerRef: ViewContainerRef
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
    this.router.navigateByUrl('/');
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

  public openDocumentConfiguration(): void {
    const modal = this.nzModalService.create({
      nzContent: EditorConfigurationModalComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzGetContainer: () => document.body,
      nzComponentParams: {
        documentId: this.documentId
      }
    });
    this.subs.push(modal.afterClose.subscribe((result: boolean) => {
      if (result) {
        this.getDocument();
      }
    }));
  }
}
