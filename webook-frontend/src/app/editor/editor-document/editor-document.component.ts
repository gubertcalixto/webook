import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'wb-editor-document',
  templateUrl: './editor-document.component.html',
  styleUrls: ['./editor-document.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditorDocumentComponent {
  public documentTitle = 'Document 1';
  public pageSelectionOpen = false;
  public pageIndex = 1;
  public pageTotalCount = 5;
  public pageSelectionExpanded = false;

  constructor(private router: Router) { }

  public redirectBack(): void {
    this.router.navigateByUrl('/');
  }
}
