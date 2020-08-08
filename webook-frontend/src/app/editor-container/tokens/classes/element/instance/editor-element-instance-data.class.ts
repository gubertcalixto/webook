import { EditorElementInstanceFrameProperties } from './editor-element-instance-frame-properties.class';
import { EditorElementInstanceFrame } from './editor-element-instance-frame.class';

export class EditorElementInstanceData {
  frameProperties?: EditorElementInstanceFrameProperties;
  data?: object;

  constructor(data?: EditorElementInstanceData) {
    if (data?.frameProperties) {
      this.frameProperties = new EditorElementInstanceFrame(data?.frameProperties).properties;
    }
    this.data = data?.data;
  }
}
