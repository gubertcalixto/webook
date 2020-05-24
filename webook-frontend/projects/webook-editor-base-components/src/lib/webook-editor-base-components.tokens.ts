import { Type } from '@angular/core';

import { TextEditorElementComponent } from './text-editor-element/text-editor-element.component';

export const EDITOR_BASE_COMPONENTS: Map<string, Type<any>> = new Map<string, Type<any>>(
  [
    ['text', TextEditorElementComponent]
  ]
);
