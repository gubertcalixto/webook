import {Component, EventEmitter, Input, OnInit, Output, TemplateRef} from '@angular/core';

@Component({
  selector: 'tcc-editor-toolbox',
  templateUrl: './tcc-editor-toolbox.component.html',
  styleUrls: ['./tcc-editor-toolbox.component.scss']
})
export class TccEditorToolboxComponent implements OnInit {
  @Input() public headerTemplate: TemplateRef<any>;
  @Input() public footerTemplate: TemplateRef<any>;
  @Output() private addElement = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  public addElementToEditor(elementId: string) {
    this.addElement.emit(elementId);
  }
}
