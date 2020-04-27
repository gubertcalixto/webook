import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { TccEditorBaseElement } from '@tcc-editor-base/tcc-editor-base-element';

@Component({
  selector: 'tebc-text-editor-element',
  templateUrl: './text-editor-element.component.html',
  styleUrls: ['./text-editor-element.component.scss']
})
export class TextEditorElementComponent extends TccEditorBaseElement {
  public editing = false;
  public text = 'Type here...';

  @ViewChild('inputToSave', { static: false }) inputToSave: ElementRef<HTMLInputElement>;

  constructor(private changeDetectorRef: ChangeDetectorRef) {
    super();
  }

  public toggleEditMode(): void {
    this.editing = !this.editing;

    // Needed to process editing mode
    this.changeDetectorRef.detectChanges();

    if (this.editing) {
      this.inputToSave.nativeElement.value = this.text;
      this.inputToSave.nativeElement.focus();
      this.inputToSave.nativeElement.select();
    }
  }

  public saveEdit(): void {
    this.text = this.inputToSave.nativeElement.value;
    this.toggleEditMode();
  }
}
