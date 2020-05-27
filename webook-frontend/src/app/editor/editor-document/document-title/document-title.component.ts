import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'wb-editor-document-title',
  templateUrl: './document-title.component.html',
  styleUrls: ['./document-title.component.scss']
})
export class EditorDocumentTitleComponent {
  @Input() public isEditingTitle = false;
  @Input() public documentTitle: string;
  @Output() public documentTitleChange = new EventEmitter<string>();
  @ViewChild('documentTitleInput', { static: false }) public titleInput: ElementRef<HTMLInputElement>;

  public toggleEditing(value?: boolean): void {
    if (typeof value === 'undefined') {
      this.isEditingTitle = !this.isEditingTitle;
    } else {
      this.isEditingTitle = value;
    }
    if (this.isEditingTitle && this.titleInput) {
      this.titleInput.nativeElement.focus();
      setTimeout(() => this.titleInput.nativeElement.select());
    }
  }

  public updateDocumentTitle(): void {
    if (!this.titleInput?.nativeElement?.value) {
      return;
    }
    this.documentTitle = this.titleInput.nativeElement.value.trim();
    this.isEditingTitle = false;
    this.documentTitleChange.emit(this.documentTitle);
  }
}
