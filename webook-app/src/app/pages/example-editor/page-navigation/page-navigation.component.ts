import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'wb-page-navigation',
  templateUrl: './page-navigation.component.html',
  styleUrls: ['./page-navigation.component.scss']
})
export class PageNavigationComponent {
  @Input() public pageIndex = 1;
  @Input() public pageSelectionExpanded = false;
  @Input() public totalCount: number;
  @Output() public pageIndexChange = new EventEmitter<number>();
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
    this.pageChange(this.pageIndex + 1);
  }

  public goToPreviousPage(): void {
    this.pageChange(this.pageIndex - 1);
  }

  public pageChange(pageNumber: number): void {
    if (pageNumber <= 0 || pageNumber > this.totalCount) {
      return;
    }
    this.pageIndex = pageNumber;
    this.pageIndexChange.emit(pageNumber);
  }
}
