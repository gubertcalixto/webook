import { Type } from '@angular/core';

export class WebookEditorElement {
  public component: Type<any>;
  constructor(data?: WebookEditorElement) {
    if (data) {
      this.component = data.component;
    }
  }
}
