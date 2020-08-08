import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { EditorDocument } from 'src/app/client/webook';

import { EditorPageService } from '../editor-page/editor-page.service';

@Component({
  selector: 'wb-editor-header',
  templateUrl: './editor-header.component.html',
  styleUrls: ['./editor-header.component.scss']
})
export class EditorHeaderComponent implements OnDestroy {
  private subs: Subscription[] = [];
  public pageTotalCount = 5;
  public pageSelectionExpanded = false;

  @Input() public document: EditorDocument;
  @Input() public pageIndex = 1;
  @Output() public pageIndexChange = new EventEmitter<number>();
  @Output() public redirectBack = new EventEmitter<void>();
  @Output() public openDocumentConfiguration = new EventEmitter<void>();

  constructor(
    private editorPageService: EditorPageService
  ) { }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }
}
