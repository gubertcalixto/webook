import {
  EditorBaseElement,
} from '../../components/editor/editor-components/editor-element-base-classes/editor-base-element';

export class EditorInteractionSelectedElementData {
  public elementInstance?: EditorBaseElement;
  public type?: string;
  public isMultiSelected?: boolean;
  public isNoneSelected?: boolean;

  constructor(elementInstance?: EditorBaseElement, type?: string, isMultiSelected?: boolean, isNoneSelected?: boolean) {
    this.elementInstance = elementInstance;
    this.type = type;
    this.isMultiSelected = isMultiSelected;
    this.isNoneSelected = isNoneSelected;
  }
}