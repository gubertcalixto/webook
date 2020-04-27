import {Type} from '@angular/core';

export class TccEditorElement {
  public component: Type<any>;
  constructor(data?: TccEditorElement) {
    if (data) {
      this.component = data.component;
    }
  }
}
