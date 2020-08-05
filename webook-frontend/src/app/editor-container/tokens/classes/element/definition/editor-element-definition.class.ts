import { Type } from '@angular/core';
import {
  EditorBaseElement,
} from 'src/app/editor-container/components/editor/editor-components/editor-element-base-classes/editor-base-element';

export class EditorElementDefinition {
  elementClass: Type<EditorBaseElement>;
  elementId: string;
  label: string;
  icon: string;
  color?: string;
  description?: string;
  imagePreviewPath?: string;
  pluginId: string;
}
