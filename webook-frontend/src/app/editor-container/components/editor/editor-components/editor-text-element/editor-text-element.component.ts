import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';

import { EditorResizeBaseElement } from '../editor-element-base-classes/resize/editor-resize-base-element';

@Component({
  selector: 'wb-editor-text-element',
  templateUrl: './editor-text-element.component.html',
  styleUrls: ['./editor-text-element.component.scss']
})
export class EditorTextElementComponent extends EditorResizeBaseElement {
  elementTypeId = 'text';
  public editing = false;
  public text = 'Escreva aqui...';

  @ViewChild('inputToSave', { static: false }) inputToSave: ElementRef<HTMLInputElement>;

  constructor(public elementRef: ElementRef<HTMLElement>, private changeDetectorRef: ChangeDetectorRef) {
    super(elementRef);
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