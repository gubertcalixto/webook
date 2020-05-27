import { EventEmitter, Input, Output } from '@angular/core';

export class WebookEditorBaseElement {
  @Input() public itemInput: any;
  // TODO: typing
  @Output() public readonly editorEmitter = new EventEmitter<any>();
  public itemOutput: any;
  public itemData: any;

  // TODO: typing
  protected emitEditorEvent(eventType: any, output = this.itemOutput, itemData = this.itemData): void {
    this.editorEmitter.next({ eventType, output, itemData });
  }
}
