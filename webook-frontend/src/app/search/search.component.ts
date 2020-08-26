import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OauthManagerService } from '@oath/services/oauth-manager.service';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { EditorDocumentPagedResultOutput } from '../client/webook';
import { NavigationService } from '../navigation/navigation.service';
import { DocumentService } from '../services/document.service';

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

  public documentsPageSize = 5;
  public get documentsCurrentPage() { return this.internalDocumentsCurrentPage; }
  public set documentsCurrentPage(value) {
    this.internalDocumentsCurrentPage = value;
    this.search();
  }
  public order: 'asc' | 'desc' = 'asc';

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
  ) { }

  ngOnInit(): void {
    this.searchValue = this.activatedRoute.snapshot.queryParams.query;
    this.search();
    // Auto refresh search
    this.searchValueChangeSubject.pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((model) => {
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

  public toggleSearchOrder() {
    this.order = this.order === 'asc' ? 'desc' : 'asc';
    this.search();
  }

  public search() {
    this.hasSearchFilterActivated = Boolean(this.searchValue);
    this.subs.push(this.documentService
      .getAllDocuments(this.searchValue, this.documentsPageSize * (this.documentsCurrentPage - 1), this.documentsPageSize, this.order)
      .subscribe((documents) => {
        this.isLoadingDocuments = false;
        this.documents = documents;
      }, () => (this.isLoadingDocuments = false)));
  }
}
