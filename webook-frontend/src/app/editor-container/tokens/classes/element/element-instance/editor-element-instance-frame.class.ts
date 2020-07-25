import {
  EDITOR_ELEMENT_DEFAULT_HEIGHT,
  EDITOR_ELEMENT_DEFAULT_MATRIX,
  EDITOR_ELEMENT_DEFAULT_ROTATION,
  EDITOR_ELEMENT_DEFAULT_WIDTH,
  EDITOR_ELEMENT_DEFAULT_X,
  EDITOR_ELEMENT_DEFAULT_Y,
} from '../../../consts/editor-element-instance-default-values.const';

export class EditorElementInstanceFrame {
  width?: string;
  height?: string;
  left: string;
  top: string;
  transform?: {
    rotate: string;
    scaleX: number;
    scaleY: number;
    matrix3d: number[];
  };

  constructor(data?: Partial<EditorElementInstanceFrame>) {
    this.width = data?.width || EDITOR_ELEMENT_DEFAULT_WIDTH;
    this.height = data?.height || EDITOR_ELEMENT_DEFAULT_HEIGHT;
    this.left = data?.left || EDITOR_ELEMENT_DEFAULT_X;
    this.top = data?.top || EDITOR_ELEMENT_DEFAULT_Y;
    this.transform = {
      rotate: data?.transform?.rotate || EDITOR_ELEMENT_DEFAULT_ROTATION,
      scaleX: data?.transform?.scaleX || 1,
      scaleY: data?.transform?.scaleY || 1,
      matrix3d: data?.transform?.matrix3d || EDITOR_ELEMENT_DEFAULT_MATRIX,
    };
  }
}
