import { Component, OnInit } from '@angular/core';
import {TccEditorBaseElement} from '@tcc-editor-base/tcc-editor-base-element';

@Component({
  selector: 'tebc-countdown-editor-element',
  templateUrl: './countdown-editor-element.component.html',
  styleUrls: ['./countdown-editor-element.component.scss']
})
export class CountdownEditorElementComponent extends TccEditorBaseElement implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
