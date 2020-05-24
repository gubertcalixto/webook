import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';

@Component({
  selector: 'wb-editor-toolbox',
  templateUrl: './webook-editor-toolbox.component.html',
  styleUrls: ['./webook-editor-toolbox.component.scss']
})
export class WebookEditorToolboxComponent {
  @Input() public headerTemplate: TemplateRef<any>;
  @Input() public footerTemplate: TemplateRef<any>;
  @Output() private addElement = new EventEmitter<string>();

  public addElementToEditor(elementId: string) {
    this.addElement.emit(elementId);
  }
}
