import { Component, OnInit, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OauthManagerService } from '@oath/services/oauth-manager.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, first } from 'rxjs/operators';

import { EditorDocumentPagedResultOutput } from '../client/webook';
import { NavigationService } from '../navigation/navigation.service';
import { DocumentService } from '../services/document.service';
import { FilterSelectionComponent } from './filter-selection/filter-selection.component';

@Component({
  selector: 'wb-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchComponent implements OnInit {
  private subs: Subscription[] = [];
  private internalSearchValue = '';
  private internalDocumentsCurrentPage = 1;

  public isLoading = true;
  public isLoadingDocuments = true;

  public hasSearchFilterActivated: boolean;
  public searchValueChangeSubject: Subject<string> = new Subject<string>();
  public documents: EditorDocumentPagedResultOutput;
  public order: 'asc' | 'desc' = 'asc';

  public currentFilter = {
    date: {
      start: undefined,
      end: undefined
    },
    user: undefined,
    rate: undefined,
    tags: []
  }
  public hasCustomFilters = false;
  public documentsPageSize = 10;
  private isIgnoringNextSearch: boolean;

  public get documentsCurrentPage() { return this.internalDocumentsCurrentPage; }
  public set documentsCurrentPage(value) {
    this.internalDocumentsCurrentPage = value;
    this.search();
  }

  public get searchValue() { return this.internalSearchValue; }
  public set searchValue(value) {
    if (this.searchValue === value) { return; }
    this.internalSearchValue = value?.trim();
    this.router.navigate([], !this.searchValue ? undefined : { queryParams: { query: this.searchValue } });
    this.searchValueChangeSubject.next(value);
  }

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private documentService: DocumentService,
    public navigationService: NavigationService,
    public oauthManagerService: OauthManagerService,
    private nzModalService: NzModalService,
    private viewContainerRef: ViewContainerRef
  ) { }

  ngOnInit(): void {
    this.searchValue = this.activatedRoute.snapshot.queryParams.query;
    this.search();
    // Auto refresh search
    this.searchValueChangeSubject.pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((model) => {
        if (this.isIgnoringNextSearch) {
          this.isIgnoringNextSearch = false;
          return;
        }
        this.searchValue = model;
        if (this.documentsCurrentPage > 1) {
          this.documentsCurrentPage = 1;
        }
        this.search();
      });
  }

  public openDocument(documentId: string): void {
    this.router.navigateByUrl(`/document/${documentId}`);
  }

  public deleteDocument(documentId: string): void {
    this.isLoadingDocuments = true;
    this.subs.push(this.documentService.deleteDocument(documentId)
      .subscribe(() => {
        this.search();
      }, () => {
        this.isLoadingDocuments = false;
      }));
  }

  public toggleSearchOrder() {
    this.order = this.order === 'asc' ? 'desc' : 'asc';
    this.search();
  }

  public search(): void {
    this.isLoadingDocuments = true;
    this.hasSearchFilterActivated = Boolean(this.searchValue);
    const normalizedTags: string[] = this.currentFilter.tags || [];

    this.subs.push(this.documentService.getAllDocuments(
      {
        filter: this.searchValue,
        skipCount: this.documentsPageSize * (this.documentsCurrentPage - 1),
        pageSize: this.documentsPageSize,
        order: this.order,
        userName: this.currentFilter.user,
        tagFilter: normalizedTags,
        startDate: this.currentFilter.date?.start,
        endDate: this.currentFilter.date?.end,
        rate: this.currentFilter.rate
      })
      .subscribe((documents) => {
        this.documents = documents;
        this.isLoadingDocuments = false;
      }, () => (this.isLoadingDocuments = false)));
  }

  public filter(): void {
    const modal = this.nzModalService.create({
      nzContent: FilterSelectionComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzComponentParams: {
        currentQuery: this.searchValue,
        currentFilter: this.currentFilter
      }
    });
    modal.afterClose.pipe(first()).subscribe((result: any) => {
      if (!result) {
        return;
      }
      this.currentFilter = {
        date: result.date,
        rate: result.rate,
        tags: result.tags,
        user: result.user
      };
      this.hasCustomFilters = result.date?.start || result.date?.end || result.rate || result.tags?.length || result.user;
      if (result.query !== this.searchValue) {
        this.searchValue = result.query;
      }

      this.search();
      this.isIgnoringNextSearch = true;
      setTimeout(() => {
        this.isIgnoringNextSearch = false;
      }, 250);
    });
  }
}
