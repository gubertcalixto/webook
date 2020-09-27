import { Component, OnDestroy, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '@oath/services/user.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Subscription } from 'rxjs';
import { filter, first } from 'rxjs/operators';
import { DocumentOutput } from 'src/app/client/webook';
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
  public document: DocumentOutput;
  public documentId: string;
  public pageIndex = 1;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private documentService: DocumentService,
    private editorPageService: EditorPageService,
    private nzModalService: NzModalService,
    private viewContainerRef: ViewContainerRef,
    private userService: UserService
  ) {
    this.activatedRoute.params.subscribe(params => {
      const documentId = params.id;
      if (!documentId) {
        this.redirectBack();
        return;
      }
      this.documentId = documentId;
      // Waits for user be resolved
      this.subs.push(this.userService.userSubject.pipe(filter(u => Boolean(u))).subscribe(() => {
        this.getDocument();
      }));
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
      if (document.userId != this.userService.userId) {
        this.router.navigateByUrl(`/document/${this.documentId}/view`);
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
      nzStyle: {
        top: '2.5vh',
        'padding-top': '2.5vh',
        'padding-bottom': '2.5vh'
      },
      nzComponentParams: {
        documentId: this.documentId
      }
    });
    modal.afterClose.pipe(first()).subscribe((result: boolean) => {
      if (result) {
        this.getDocument();
      }
    });
  }
}
