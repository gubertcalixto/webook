import { Component, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import {
  EditorInteractionSelectedElementData,
} from 'src/app/editor-container/services/interactions/editor-interaction-selected-element-data';
import { EditorInteractionService } from 'src/app/editor-container/services/interactions/editor-interaction.service';

export type PagePropertiesElementTypes = 'page' | 'none' | 'multiple' | string;

@Component({
  selector: 'wb-editor-properties-container',
  templateUrl: './editor-properties-container.component.html',
  styleUrls: ['./editor-properties-container.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditorPropertiesContainerComponent {
  private subs: Subscription[] = [];

  public isLoading = true;
  public currentElementSelectedMetaData: EditorInteractionSelectedElementData;

  public get currentElementSelectedInstance() {
    return this.currentElementSelectedMetaData?.elementInstance;
  }
  public get currentElementSelectedData() {
    return this.currentElementSelectedInstance?.data;
  }

  public get currentElementType(): PagePropertiesElementTypes {
    if (this.currentElementSelectedMetaData) {
      if (this.currentElementSelectedMetaData.isNoneSelected) {
        return 'none';
      }
      if (this.currentElementSelectedMetaData.isMultiSelected) {
        return 'multiple';
      }
      return this.currentElementSelectedMetaData?.type || 'page';
    }
    return 'none';
  }

  constructor(private editorInteractionService: EditorInteractionService) {
    this.subs.push(this.editorInteractionService.currentSelectedElementDataSubject
      .pipe(filter(r => Boolean(r)))
      .subscribe((elementMetadata) => {
        this.currentElementSelectedMetaData = elementMetadata;
        setTimeout(() => {
          this.isLoading = false;
        })
      }));
  }

  public setDataProperty(fieldName: string, fieldValue: any) {
    if (this.currentElementSelectedData) {
      this.currentElementSelectedData[fieldName] = fieldValue;
    }
    this.currentElementSelectedInstance.dataChanged.next();
  }
}
