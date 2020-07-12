import { Injectable, Type } from '@angular/core';
import { EDITOR_BASE_COMPONENTS } from '@wb-editor-base-components/webook-editor-base-components.tokens';

@Injectable()
export class WebookEditorService {
  elementList = EDITOR_BASE_COMPONENTS;

  constructor() { }

  public getElementClassById(id: string): Type<any> {
    return this.elementList.get(id);
  }
}
