import { Component, Input, OnDestroy, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Subscription } from 'rxjs';
import { EditorDocument } from 'src/app/client/webook';

import {
  EditorConfigurationModalComponent,
} from '../editor-configuration/editor-configuration-modal/editor-configuration-modal.component';
import { EditorPageService } from '../editor-page/editor-page.service';

@Component({
  selector: 'wb-editor-header',
  templateUrl: './editor-header.component.html',
  styleUrls: ['./editor-header.component.scss']
})
export class EditorHeaderComponent implements OnDestroy {
  private subs: Subscription[] = [];
  @Input() public document: EditorDocument;
  public pageIndex = 1;
  public pageTotalCount = 5;
  public pageSelectionExpanded = false;

  constructor(
    private router: Router,
    private nzModalService: NzModalService,
    private editorPageService: EditorPageService,
    private viewContainerRef: ViewContainerRef
  ) {
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  public redirectBack(): void {
    this.router.navigateByUrl('/');
  }

  public openDocumentConfiguration(): void {
    const modal = this.nzModalService.create({
      nzContent: EditorConfigurationModalComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzGetContainer: () => document.body,
      nzComponentParams: {
        documentId: this.document.id
      }
    });
    this.subs.push(modal.afterClose.subscribe((result: boolean) => {
      if (result) {
        this.editorPageService.documentChangedSubject.next();
      }
    }));
  }
}
