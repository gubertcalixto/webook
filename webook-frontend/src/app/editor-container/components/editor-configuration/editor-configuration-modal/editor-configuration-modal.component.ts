import { Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { EditorDocument, EditorDocumentAllowedAccess, Tags, UserPreferenceOutput } from 'src/app/client/webook';
import { DocumentService } from 'src/app/services/document.service';
import { UserPreferencesService } from 'src/app/user/user-preferences/user-preferences.service';

@Component({
  selector: 'wb-editor-configuration-modal',
  templateUrl: './editor-configuration-modal.component.html',
  styleUrls: ['./editor-configuration-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditorConfigurationModalComponent implements OnInit, OnDestroy {
  private subs: Subscription[] = [];
  public form: FormGroup;
  public errorDuringUpdate: boolean;
  public isUpdating: boolean;
  public userPreferences: UserPreferenceOutput;
  public isLoading: boolean;

  @Input() public documentId: string;

  constructor(
    private modalRef: NzModalRef,
    private fb: FormBuilder,
    private documentService: DocumentService,
    public userPreferencesService: UserPreferencesService
  ) { }

  ngOnInit(): void {
    if (!this.documentId) {
      return;
    }
    this.getDocument();

    this.userPreferencesService.hasLoadedSubject.pipe(filter((loaded) => loaded)).subscribe(() => {
      this.userPreferences = this.userPreferencesService.getUserPreferences();
      if (this.form && this.userPreferences.invisibleMode) {
        this.form.get('documentAccess').setValue(false);
      }
    });
  }

  ngOnDestroy(): void {
    this.subs.forEach((s) => s.unsubscribe());
  }

  public documentAccessToggle(): void {
    if (this.userPreferences?.invisibleMode) {
      return;
    }
    this.form.get('documentAccess').setValue(!this.form.get('documentAccess').value);
    this.form.get('documentAccess').markAsDirty();
  }

  private getDocument(): void {
    this.isLoading = true;
    this.subs.push(this.documentService.getDocument(this.documentId).subscribe((doc: EditorDocument) => {
      const tagNames = doc.tags ? doc.tags.map((t: Tags) => t.tagName) : [];
      this.form = this.fb.group({
        title: [doc.title, [Validators.required]],
        description: [doc.description, [Validators.maxLength(250)]],
        tags: [tagNames],
        image: [doc.image, Validators.nullValidator],
        documentAccess: [Boolean(doc.documentAccess)]
      });
      if (this.userPreferences?.invisibleMode) {
        this.form.get('documentAccess').setValue(false);
      }
      this.isLoading = false;
    }));
  }

  public cancelModal(): void {
    this.modalRef.close(false);
  }

  public saveModal(): void {
    if (this.form.invalid || this.isUpdating) {
      return;
    }
    this.errorDuringUpdate = false;
    this.isUpdating = true;
    const title = this.form.get('title').value;
    const description = this.form.get('description').value;
    const tags: string[] = this.form.get('tags').value;
    const normalizedTags: Tags[] = [];
    if (tags && tags.length > 0) {
      tags.forEach((tag) => {
        normalizedTags.push({ tagName: tag });
      });
    }
    // const image = this.form.get('image').value;
    const documentAccess = Boolean(this.form.get('documentAccess').value)
      ? EditorDocumentAllowedAccess.NUMBER_1 // public
      : EditorDocumentAllowedAccess.NUMBER_0; // private

    this.subs.push(this.documentService.updateDocument(this.documentId, title, description, documentAccess, normalizedTags).subscribe((res) => {
      this.modalRef.close(true);
    }, () => {
      this.isUpdating = false;
      this.errorDuringUpdate = true;
    }));
  }
}
