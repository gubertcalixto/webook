import { Component, Input, ViewEncapsulation } from '@angular/core';

import { ImageUtils } from '../../../../../tokens/classes/element/image-utils';

@Component({
  selector: 'wb-image-properties',
  templateUrl: './image-properties.component.html',
  styleUrls: ['./image-properties.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ImagePropertiesComponent {
  @Input() public currentElementSelectedData: any;
  @Input() public setDataProperty: (fieldName: string, fieldValue: any) => void;
  public readonly defaultImage = '/assets/editor/undraw_photo.svg';
  public maximumImageSizeReached = false;
  public fileReaderLoading = false;

  public alterImage(event: any) {
    if (!event.target.files?.length) {
      return;
    }
    if (event.target.files[0].size / 1024 / 1024 > 5) {
      return;
    }
    this.maximumImageSizeReached = false;
    this.fileReaderLoading = true;

    ImageUtils.getBase64ImageFromFile(event.target.files[0])
      .then((base64Image) => {
        this.setDataProperty('image', base64Image);
      })
      .catch(error => {
        if (error.message === 'Exceeded image max size') {
          this.maximumImageSizeReached = true;
        }
      })
      .finally(() => {
        this.fileReaderLoading = false;
      });
  }


  public removeImage(): void {
    this.setDataProperty('image', this.defaultImage);
  }
}
