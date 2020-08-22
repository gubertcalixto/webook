import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'wb-editor-document-page-expanded-navigation',
  templateUrl: './page-expanded-navigation.component.html',
  styleUrls: ['./page-expanded-navigation.component.scss']
})
export class EditorDocumentPageExpandedNavigationComponent {
  @Input() public pageIndex = 1;
  @Input() public totalCount = 0;
  @Input() public visualizeMode = false;
  @Output() private pageIndexChange = new EventEmitter<number>();
  @Output() private pageSelected = new EventEmitter<void>();
  public itemsPerPage = 3;

  public pageIndexChanged(index: number): void {
    this.pageIndex = index;
    this.pageIndexChange.emit(this.pageIndex);
    this.pageSelected.emit();
  }

  public goToPreviousPage(): void {
    if (this.pageIndex <= 1) {
      return;
    }
    this.pageIndexChanged(this.pageIndex - 1);
  }

  public goToNextPage(): void {
    if (this.pageIndex >= this.totalCount) {
      return;
    }
    this.pageIndexChanged(this.pageIndex + 1);
  }

  public goToFirstPage(): void {
    this.pageIndexChanged(1);
  }

  public goToLastPage(): void {
    this.pageIndexChanged(this.totalCount);
  }
}
