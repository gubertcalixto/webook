import { valueOrDefault } from 'src/app/editor-container/tokens/utils/value-or-default';

export class EditorDragBaseElementOptions {
  hasOrigin = false;
  draggable = true;
  dragTarget: any;
  isDragging = false;
  allowExceedDuringDrag: false;
  temporaryCoordinates: {
    x?: number;
    y?: number;
  } = {};
  coordinates: {
    x?: number;
    y?: number;
  } = {};

  constructor(data?: Partial<EditorDragBaseElementOptions>) {
    if (!data) {
      return;
    }
    this.hasOrigin = data?.hasOrigin;
    this.draggable = valueOrDefault(data?.draggable, true);
    this.dragTarget = data?.dragTarget;
    this.allowExceedDuringDrag = data?.allowExceedDuringDrag;
    this.isDragging = data?.isDragging;
    this.temporaryCoordinates = data?.temporaryCoordinates || {};
    this.coordinates = data?.coordinates || {};
  }
}
