import { Frame } from 'scenejs';

import {
  EDITOR_ELEMENT_DEFAULT_HEIGHT,
  EDITOR_ELEMENT_DEFAULT_MATRIX,
  EDITOR_ELEMENT_DEFAULT_ROTATION,
  EDITOR_ELEMENT_DEFAULT_WIDTH,
  EDITOR_ELEMENT_DEFAULT_X,
  EDITOR_ELEMENT_DEFAULT_Y,
} from '../../../consts/element/instance/editor-element-instance-default-values.const';
import { EditorElementInstanceFrameProperties } from './editor-element-instance-frame-properties.class';

export class EditorElementInstanceFrame extends Frame {
  properties: EditorElementInstanceFrameProperties;

  constructor(data?: Partial<EditorElementInstanceFrameProperties>) {
    super();
    if (!this.properties) {
      this.properties = {};
    }
    this.properties.width = data?.width || EDITOR_ELEMENT_DEFAULT_WIDTH;
    this.properties.height = data?.height || EDITOR_ELEMENT_DEFAULT_HEIGHT;
    this.properties.left = data?.left || EDITOR_ELEMENT_DEFAULT_X;
    this.properties.top = data?.top || EDITOR_ELEMENT_DEFAULT_Y;
    this.properties.transform = {
      rotate: data?.transform?.rotate || EDITOR_ELEMENT_DEFAULT_ROTATION,
      scaleX: data?.transform?.scaleX || 1,
      scaleY: data?.transform?.scaleY || 1,
      matrix3d: data?.transform?.matrix3d || EDITOR_ELEMENT_DEFAULT_MATRIX,
    };
  }
}
