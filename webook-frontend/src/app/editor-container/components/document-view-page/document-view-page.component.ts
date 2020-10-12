import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '@oath/services/user.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { EditorDocument } from 'src/app/client/webook';
import { DocumentService } from 'src/app/services/document.service';

import { EditorDenounceModalComponent } from '../editor-denounce/editor-denounce-modal/editor-denounce-modal.component';
import { EditorPageService } from '../editor-page/editor-page.service';

@Component({
  selector: 'wb-document-view-page',
  templateUrl: './document-view-page.component.html',
  styleUrls: ['./document-view-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DocumentViewPageComponent implements OnDestroy {
  private subs: Subscription[] = [];
  public document: EditorDocument;
  public documentId: string;
  public pageIndex = 1;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private documentService: DocumentService,
    private nzNotificationService: NzNotificationService,
    private nzModalService: NzModalService,
    private editorPageService: EditorPageService,
    private userService: UserService,
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
      if (!document || document.documentAccess === 0) {
        if (document.documentAccess === 0 && document.userId === this.userService.userId) {
          this.router.navigateByUrl(`/document/${this.documentId}`);
          return;
        }
        this.redirectBack();
        return;
      }
      this.document = document;
    },
      () => {
        this.redirectBack();
      }));
  }

  public openDenounceModal(): void {
    const modal = this.nzModalService.create<EditorDenounceModalComponent>({
      nzContent: EditorDenounceModalComponent,
      nzTitle: 'Denunciar Documento',
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
        this.nzNotificationService.success('Denúncia Realizada', 'Sua denúncia foi recebida. Verificaremos o mais rápido possivel', {
          nzPlacement: 'topRight'
        });
        this.redirectBack();
      }
    });
  }
}
