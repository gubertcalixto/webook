import { valueOrDefault } from 'src/app/editor-container/tokens/utils/value-or-default';

export class EditorRotateBaseElementOptions {
  rotatable = true;
  rotatePosition: 'left' | 'right' | 'top' | 'bottom' = 'top';
  isRotating = false;
  temporaryRotation = 0;
  rotation = 0;

  constructor(data?: Partial<EditorRotateBaseElementOptions>) {
    if (!data) { return; }
    this.rotatable = valueOrDefault(data?.rotatable, this.rotatable);
    this.rotatePosition = valueOrDefault(data?.rotatePosition, this.rotatePosition);
    this.isRotating = valueOrDefault(data?.isRotating, this.isRotating);
    this.temporaryRotation = valueOrDefault(data?.temporaryRotation, this.temporaryRotation);
    this.rotation = valueOrDefault(data?.rotation, this.rotation);
  }
}
