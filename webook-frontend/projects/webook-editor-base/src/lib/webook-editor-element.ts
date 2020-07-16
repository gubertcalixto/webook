import { Type } from '@angular/core';

export class WebookEditorElement {
  public id: string;
  public componentClass: Type<any>;
  public data?: object;

  constructor(data?: WebookEditorElement) {
    if (data) {
      this.id = data.id;
      this.componentClass = data.componentClass;
      this.data = data.data;
    }
  }
}
