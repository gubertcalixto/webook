import { AfterViewInit, Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@oath/services/user.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { EditorDocument } from '../client/webook';
import { NavigationService } from '../navigation/navigation.service';
import { DocumentService } from '../services/document.service';
import { DocumentCreationModel } from './tokens/classes/document-creation-model.class';
import { documentCreationModels } from './tokens/consts/document-creation-models.const';

@Component({
  selector: 'wb-my-documents-page',
  templateUrl: './my-documents-page.component.html',
  styleUrls: ['./my-documents-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MyDocumentsPageComponent implements OnInit, AfterViewInit, OnDestroy {
  private subs: Subscription[] = [];
  public maximumCreateDocumentModelSize = 5;
  public modelPageIndex = 0;
  public isAddContainerOpened = false;
  public createDocumentViewExpanded = false;
  public shouldHaveCreateDocumentViewExpanded = false;
  public myDocuments: EditorDocument[] = [];
  public isLoadingMyDocuments = true;
  public hasSearchFilterActivated: boolean;
  @ViewChild('addDocumentTemplate') private addDocumentTemplate: TemplateRef<any>;

  public get createDocumentModels() {
    if (!this.createDocumentViewExpanded) {
      const skip = this.modelPageIndex * this.maximumCreateDocumentModelSize;
      return documentCreationModels.slice(skip, skip + this.maximumCreateDocumentModelSize);
    }
    return documentCreationModels;
  }

  public get documentModelsSize(): number {
    return documentCreationModels.length;
  }

  public get shouldShowModelsNavigateLeftArrow(): boolean {
    return Boolean(!this.createDocumentViewExpanded && this.modelPageIndex);
  }

  public get shouldShowModelsNavigateRightArrow(): boolean {
    return !this.createDocumentViewExpanded
      && this.documentModelsSize > this.maximumCreateDocumentModelSize
      && (this.modelPageIndex * this.maximumCreateDocumentModelSize) + this.maximumCreateDocumentModelSize < this.documentModelsSize;
  }

  constructor(
    public navigationService: NavigationService,
    private documentService: DocumentService,
    private router: Router,
    private notificationService: NzNotificationService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.shouldHaveCreateDocumentViewExpanded = documentCreationModels.length > this.maximumCreateDocumentModelSize;
  }

  ngAfterViewInit(): void {
    if (this.addDocumentTemplate) {
      this.navigationService.setNavigationActionsTemplate(this.addDocumentTemplate);
      this.navigationService.emitHasSearch(true);

      this.subs.push(this.navigationService.search
        .pipe(debounceTime(300))
        .subscribe((searchQuery) => {
          this.getMyDocuments(searchQuery);
        }));
    }
  }

  ngOnDestroy(): void {
    this.subs.forEach((s) => s.unsubscribe());
    this.navigationService.clearNavigationActionsTemplate();
    this.navigationService.emitHasSearch(false);
  }

  private getMyDocuments(searchQuery?: string) {
    this.hasSearchFilterActivated = Boolean(searchQuery);
    this.subs.push(this.documentService.getMyDocuments(searchQuery).subscribe((res) => {
      this.myDocuments = res;
      this.myDocuments.forEach((document) => {
        document.userId = this.userService.userId;
      })
      this.isLoadingMyDocuments = false;
    }, () => (this.isLoadingMyDocuments = false)));
  }

  public toggleCreateDocumentView(): void {
    this.createDocumentViewExpanded = !this.createDocumentViewExpanded;
    if (!this.createDocumentViewExpanded) {
      this.modelPageIndex = 0;
    }
  }

  public createDocument(model?: DocumentCreationModel): void {
    if (!model || model.id === 'empty') {
      this.subs.push(this.documentService.createDocument()
        .subscribe((document) => {
          this.openDocument(document.id);
        }));
    }
  }

  public openDocument(documentId: string): void {
    this.router.navigateByUrl(`/document/${documentId}`);
  }

  public deleteDocument(documentId: string): void {
    const documentToDelete = this.myDocuments.find(d => d.id === documentId);
    this.subs.push(this.documentService.deleteDocument(documentId)
      .subscribe(() => {
        this.getMyDocuments(this.navigationService.search.value);
        const message = documentToDelete ? `O documento "${documentToDelete.title}" foi deletado com sucesso` : '';
        this.notificationService.success('Documento deletado', message);
      }));
  }
}
