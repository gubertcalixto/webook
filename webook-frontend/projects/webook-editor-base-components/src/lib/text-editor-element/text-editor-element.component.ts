import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { WebookEditorBaseElement } from '@webook-editor-base/webook-editor-base-element';

@Component({
  selector: 'wb-text-editor-element',
  templateUrl: './text-editor-element.component.html',
  styleUrls: ['./text-editor-element.component.scss']
})
export class TextEditorElementComponent extends WebookEditorBaseElement {
  public editing = false;
  public text = 'Escreva aqui...';

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
