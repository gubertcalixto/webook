import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EditorDocument } from 'src/app/client/webook';
import { DocumentService } from 'src/app/services/document.service';

@Component({
  selector: 'wb-editor-document',
  templateUrl: './editor-document.component.html',
  styleUrls: ['./editor-document.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditorDocumentComponent implements OnDestroy {
  private subs: Subscription[] = [];
  public document: EditorDocument;
  public pageSelectionOpen = false;
  public pageIndex = 1;
  public pageTotalCount = 5;
  public pageSelectionExpanded = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private documentService: DocumentService,
  ) {
    this.activatedRoute.params.subscribe(params => {
      const documentId = params['id'];
      if (!documentId) {
        this.redirectBack();
        return;
      }
      this.getDocument(documentId);
    });
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  public redirectBack(): void {
    this.router.navigateByUrl('/');
  }

  private getDocument(id: string): void {
    this.subs.push(this.documentService.getDocument(id).subscribe(document => {
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

  public updateDocumentTitle(title: string): void {
    const lastTitle = this.document.title;
    if (title === lastTitle) {
      return;
    }
    this.document.title = title;
    this.subs.push(this.documentService.updateTitle(this.document.id, title).subscribe(resultedTitle => {
      this.document.title = resultedTitle;
    }, () => this.document.title = lastTitle));
  }
}
