import { Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Subscription } from 'rxjs';
import { EditorDocumentAllowedAccess } from 'src/app/client/webook';
import { DocumentService } from 'src/app/services/document.service';

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

  @Input() public documentId: string;

  constructor(
    private modalRef: NzModalRef,
    private fb: FormBuilder,
    private documentService: DocumentService,
  ) { }

  ngOnInit(): void {
    if (!this.documentId) {
      return;
    }
    this.getDocument();
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  public documentAccessToggle(): void {
    this.form.get('documentAccess').setValue(!this.form.get('documentAccess').value);
    this.form.get('documentAccess').markAsDirty();
  }

  private getDocument(): void {
    this.subs.push(this.documentService.getDocument(this.documentId).subscribe(doc => {
      this.form = this.fb.group({
        title: [doc.title, [Validators.required]],
        description: [doc.description, [Validators.maxLength(250)]],
        // TODO: SET DOCUMENT IMAGE
        // image: [doc.image, Validators.nullValidator],
        documentAccess: [Boolean(doc.documentAccess), Validators.nullValidator]
      });
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
    // const image = this.form.get('image').value;
    const documentAccess = Boolean(this.form.get('documentAccess').value)
      ? EditorDocumentAllowedAccess.NUMBER_1 // public
      : EditorDocumentAllowedAccess.NUMBER_0; // private

    this.subs.push(this.documentService.updateDocument(this.documentId, title, description, documentAccess).subscribe(res => {
      this.modalRef.close(true);
    }, () => {
      this.isUpdating = false;
      this.errorDuringUpdate = true;
    }));
  }
}
