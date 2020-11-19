import { ChangeDetectorRef, Component, ElementRef, Injector, ViewChild } from '@angular/core';
import { EditorInteractionService } from 'src/app/editor-container/services/interactions/editor-interaction.service';

import { EditorResizeBaseElement } from '../editor-element-base-classes/resize/editor-resize-base-element';

@Component({
  selector: 'wb-editor-text-element',
  templateUrl: './editor-text-element.component.html',
  styleUrls: ['./editor-text-element.component.scss']
})
export class EditorTextElementComponent extends EditorResizeBaseElement {
  public editorInteractionService: EditorInteractionService;
  public elementTypeId = 'wb-text';
  public editing = false;
  public text: string = 'Escreva aqui...';

  @ViewChild('inputToSave') inputToSave: ElementRef<HTMLInputElement>;

  constructor(
    public elementRef: ElementRef<HTMLElement>,
    private changeDetectorRef: ChangeDetectorRef,
    injector: Injector
  ) {
    super(elementRef, injector);
    this.editorInteractionService = injector.get(EditorInteractionService);
  }

  protected setInitialSize(): void {
    const width = this.frame.get('width');
    if (width === undefined || width === null || width === 'unset') {
      this.frame.set('width', '200px');
      this.updateFrame();
    }
  }

  protected setData(): void {
    this.text = this.data?.text || 'Escreva aqui...';
  }

  public getTextVerticalAlign(position: string): string {
    if(position?.startsWith('T')) { return 'flex-start'; }
    if(position?.startsWith('C')) { return 'center'; }
    if(position?.startsWith('B')) { return 'flex-end'; }
    return 'unset';
  }
  
  public getTextHorizontalAlign(position: string): string {
    if(position?.endsWith('E')) { return 'flex-start'; }
    if(position?.endsWith('C')) { return 'center'; }
    if(position?.endsWith('D')) { return 'flex-end'; }
    return 'unset';
  }

  public toggleEditMode(): void {
    if (this.visualizeMode) { return; }
    this.editing = !this.editing;

    // Needed to process editing mode
    this.changeDetectorRef.detectChanges();
    this.moveable.updateRect();

    if (this.editing) {
      this.inputToSave.nativeElement.value = this.text;
      this.inputToSave.nativeElement.focus();
      this.inputToSave.nativeElement.select();
    }
  }

  public saveEdit(): void {
    this.text = this.inputToSave.nativeElement.value;
    this.toggleEditMode();
    this.data.text = this.text;
    this.emitChange();
  }
}
