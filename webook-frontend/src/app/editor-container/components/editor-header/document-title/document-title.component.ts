import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { DocumentService } from 'src/app/services/document.service';

@Component({
  selector: 'wb-editor-document-title',
  templateUrl: './document-title.component.html',
  styleUrls: ['./document-title.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditorDocumentTitleComponent implements OnDestroy {
  private subs: Subscription[] = [];
  @Input() public isEditingTitle = false;
  @Input() public documentTitle: string;
  @Input() public documentId: string;
  @HostBinding('class.visualize-mode') @Input() public visualizeMode = false;
  @Output() public documentTitleChange = new EventEmitter<string>();
  @ViewChild('documentTitleInput', { static: false }) public titleInput: ElementRef<HTMLInputElement>;

  constructor(private documentService: DocumentService) { }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  public toggleEditing(value?: boolean): void {
    if (this.visualizeMode) {
      return;
    }
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
    if (this.visualizeMode) {
      return;
    }
    if (!this.titleInput?.nativeElement?.value) {
      return;
    }

    const lastTitle = this.documentTitle;
    const newTitle = this.titleInput.nativeElement.value.trim();
    if (newTitle === lastTitle) {
      return;
    }

    this.subs.push(this.documentService.updateTitle(this.documentId, newTitle).subscribe(resultedTitle => {
      this.documentTitle = resultedTitle;
      this.documentTitleChange.emit(this.documentTitle);
      this.isEditingTitle = false;
    }, () => {
      this.documentTitle = lastTitle;
      this.isEditingTitle = false;
    }));
  }
}
