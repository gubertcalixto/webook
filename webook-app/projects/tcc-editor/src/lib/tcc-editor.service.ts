import {Injectable, Type} from '@angular/core';
import {EDITOR_BASE_COMPONENTS} from '@tcc-editor-base-components/tcc-editor-base-components.tokens';

@Injectable()
export class TccEditorService {
  elementList = EDITOR_BASE_COMPONENTS;

  constructor() { }

  public getElementContentById(id: string): Type<any> {
    return this.elementList.get(id);
  }
}
