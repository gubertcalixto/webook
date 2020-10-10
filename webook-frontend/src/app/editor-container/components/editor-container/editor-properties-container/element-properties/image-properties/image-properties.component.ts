import { Component, Input, ViewEncapsulation } from '@angular/core';

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
    const reader = new FileReader();
    // Checks if image size is larger than 5 MB
    if (event.target.files[0].size / 1024 / 1024 > 5) {
      this.maximumImageSizeReached = true;
      return;
    }
    this.maximumImageSizeReached = false;
    this.fileReaderLoading = true;
    const file = event.target.files[0];
    reader.readAsDataURL(file);
    reader.onload = () => {
      const fileBase64 = 'data:image/png;base64,' + reader.result.toString().split(',')[1];
      this.setDataProperty('image', fileBase64);
      this.fileReaderLoading = false;
    };
  }


  public removeImage(): void {
    this.setDataProperty('image', this.defaultImage);
  }
}
