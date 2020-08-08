import { valueOrDefault } from 'src/app/editor-container/tokens/utils/value-or-default';

export class EditorResizeBaseElementOptions {
  resizable = true;
  keepRatio = false;
  isResizing = false;
  temporarySize: {
    width?: number;
    height?: number;
  } = {};
  size: {
    width?: number;
    height?: number;
  } = {};

  constructor(data?: Partial<EditorResizeBaseElementOptions>) {
    if (!data) { return; }
    this.resizable = valueOrDefault(data?.resizable, this.resizable);
    this.keepRatio = valueOrDefault(data?.keepRatio, this.keepRatio);
    this.isResizing = valueOrDefault(data?.isResizing, this.isResizing);
    this.temporarySize = valueOrDefault(data?.temporarySize, this.temporarySize);
    this.size = valueOrDefault(data?.size, this.size);
  }
}
