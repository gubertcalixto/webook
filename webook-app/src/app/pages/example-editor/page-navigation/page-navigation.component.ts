import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'wb-page-navigation',
  templateUrl: './page-navigation.component.html',
  styleUrls: ['./page-navigation.component.scss']
})
export class PageNavigationComponent {
  @Input() public currentPage = 1;
  @Input() public pageSelectionExpanded = false;
  @Input() public maxPageSize: number;
  @Output() public currentPageChange = new EventEmitter<number>();
  @Output() public pageSelectionExpandedChange = new EventEmitter<boolean>();

  public togglePageSelectionExpanded(state?: boolean, event?: MouseEvent): void {
    if (typeof state === 'undefined') {
      this.pageSelectionExpanded = !this.pageSelectionExpanded;
    } else {
      this.pageSelectionExpanded = state;
    }
    this.pageSelectionExpandedChange.emit(this.pageSelectionExpanded);
    if (event) {
      event.stopPropagation();
    }
  }

  public goToNextPage(): void {
    this.pageChange(this.currentPage + 1);
  }

  public goToPreviousPage(): void {
    this.pageChange(this.currentPage - 1);
  }

  public pageChange(pageNumber: number): void {
    if (pageNumber <= 0 || pageNumber > this.maxPageSize) {
      return;
    }
    this.currentPage = pageNumber;
    this.currentPageChange.emit(pageNumber);
  }
}
