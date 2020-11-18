import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { EditorDocumentPageService } from 'src/app/editor-container/services/document-page.service';

@Component({
  selector: 'wb-editor-document-page-expanded-navigation',
  templateUrl: './page-expanded-navigation.component.html',
  styleUrls: ['./page-expanded-navigation.component.scss']
})
export class EditorDocumentPageExpandedNavigationComponent implements OnInit, OnDestroy {
  private getThumbnailSubscription: Subscription;
  private internalTotalCount = 0;
  private hasStarted = false;

  public itemsPerPage = 3;
  public pageThumbnails: Map<number, string>;
  public pageNavigationIndex = 1;
  public isGettingThumbnails: boolean;

  @Input() public documentId: string;
  @Input() public pageIndex = 1;
  @Input() public get totalCount() { return this.internalTotalCount; }
  public set totalCount(value) {
    if (value !== this.internalTotalCount) {
      this.internalTotalCount = value;
      if (this.hasStarted) {
        this.getThumbnails(true);
      }
    }
  }
  @Input() public visualizeMode = false;
  @Output() private pageIndexChange = new EventEmitter<number>();
  @Output() private pageSelected = new EventEmitter<void>();
  @Output() private pageDeleted = new EventEmitter<number>();

  private lastCurrentPageThumbnails: { pageNavigationIndex: number; pageThumbnailsAsString: string, currentPageThumbnails: any; };
  public get currentPageThumbnails(): { index: number; thumbnail: string }[] {
    if (
      this.lastCurrentPageThumbnails?.pageNavigationIndex === this.pageNavigationIndex
      && this.lastCurrentPageThumbnails.pageThumbnailsAsString === this.getPageThumbnailsAsString(this.pageThumbnails)
    ) {
      return this.lastCurrentPageThumbnails.currentPageThumbnails;
    }
    const thumbnails = this.recalculateThumbnails();
    return thumbnails;
  }

  public get maxNavigationIndex(): number {
    return this.totalCount == this.itemsPerPage
      ? 1
      : Math.ceil(this.totalCount / this.itemsPerPage);
  }

  constructor(private editorDocumentPageService: EditorDocumentPageService) { }

  ngOnInit(): void {
    this.pageThumbnails = new Map<number, string>();

    if (this.itemsPerPage > this.totalCount) {
      this.itemsPerPage = this.totalCount;
    }

    this.pageNavigationIndex = this.getNavigationIndexByPageIndex();
    this.getThumbnails();
    this.hasStarted = true;
  }

  ngOnDestroy(): void {
    if (this.getThumbnailSubscription) {
      this.getThumbnailSubscription.unsubscribe();
    }
  }

  private getThumbnails(forceRecalculation = false): void {
    this.isGettingThumbnails = true;
    const skipCount = (this.pageNavigationIndex - 1) * this.itemsPerPage;

    let hasThumbnailCache = !forceRecalculation;
    if (hasThumbnailCache) {
      for (let i = skipCount + 1; i < skipCount + 1 + this.itemsPerPage; i++) {
        if (!this.pageThumbnails.has(i)) {
          hasThumbnailCache = false;
          break;
        }
      }
    }

    if (hasThumbnailCache) {
      this.isGettingThumbnails = false;
      return;
    }

    if (this.getThumbnailSubscription) {
      this.getThumbnailSubscription.unsubscribe();
    }
    this.getThumbnailSubscription =
      this.editorDocumentPageService.getPageThumbnails(this.documentId, skipCount, this.itemsPerPage)
        .subscribe(result => {
          for (let i = skipCount + 1; i < skipCount + 1 + this.itemsPerPage; i++) {
            const indexAsString = `${i}`;
            const currentItem = result[indexAsString]
            this.pageThumbnails.set(i, currentItem);
            this.isGettingThumbnails = false;
          }
          if (forceRecalculation) {
            this.recalculateThumbnails();
          }
        }, () => { this.isGettingThumbnails = false; });
  }

  private getPageThumbnailsAsString(thumbnails = this.pageThumbnails): string {
    let jsonObj = {};
    thumbnails.forEach((value: string, key: number) => {
      jsonObj[key] = value
    });
    return JSON.stringify(jsonObj);
  }

  private getNavigationIndexByPageIndex(index = this.pageIndex): number {
    return Math.ceil(index / this.itemsPerPage);
  }

  public pageNavigationIndexChange(index: number): void {
    this.pageNavigationIndex = index;
    this.getThumbnails();
  }

  public pageIndexChanged(index: number): void {
    this.pageIndex = index;
    this.pageIndexChange.emit(this.pageIndex);
    this.pageNavigationIndex = this.getNavigationIndexByPageIndex();
    this.pageSelected.emit();
  }

  public goToPreviousPage(): void {
    if (this.pageNavigationIndex <= 1) {
      return;
    }
    this.pageNavigationIndexChange(this.pageNavigationIndex - 1);
  }

  public goToNextPage(): void {
    if (this.pageNavigationIndex >= this.maxNavigationIndex) {
      return;
    }
    this.pageNavigationIndexChange(this.pageNavigationIndex + 1);
  }

  public goToFirstPage(): void {
    this.pageNavigationIndexChange(1);
  }

  public goToLastPage(): void {
    this.pageNavigationIndexChange(this.maxNavigationIndex);
  }

  public deletePage(pageNumber: number, event: MouseEvent) {
    event?.stopPropagation();
    event?.preventDefault();
    this.pageDeleted.next(pageNumber);
  }

  private recalculateThumbnails(): any[] {
    const skipCount = (this.pageNavigationIndex - 1) * this.itemsPerPage;
    let itemsPerPage = this.itemsPerPage;
    const thumbnails = [];
    const thumbnailLimit = skipCount + itemsPerPage >= this.totalCount ? this.totalCount : skipCount + itemsPerPage;
    for (let i = skipCount + 1; i <= thumbnailLimit; i++) {
      thumbnails.push({
        index: i,
        thumbnail: this.pageThumbnails.get(i),
      });
    }
    this.lastCurrentPageThumbnails = {
      pageNavigationIndex: this.pageNavigationIndex,
      pageThumbnailsAsString: this.getPageThumbnailsAsString(this.pageThumbnails),
      currentPageThumbnails: thumbnails,
    };
    return thumbnails;
  }
}
