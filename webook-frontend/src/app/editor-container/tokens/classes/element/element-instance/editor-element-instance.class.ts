import { EditorElementInstanceFrame } from './editor-element-instance-frame.class';

export class EditorElementInstanceData {
  frame?: EditorElementInstanceFrame;
  data?: object;

  constructor(data?: Partial<EditorElementInstanceData>) {
    if (data?.frame) {
      this.frame = new EditorElementInstanceFrame(data?.frame);
    }
    this.data = data?.data;
  }
}
