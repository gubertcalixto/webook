import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { PixabayHit, PixabayResult, TccPixabayService } from 'projects/legacy-projects/tcc-pixabay/src/public-api';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'wb-carousel-properties',
  templateUrl: './carousel-properties.component.html',
  styleUrls: ['./carousel-properties.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CarouselPropertiesComponent implements OnInit {
  private internalSearchQuery = '';
  private hasStarted = false;
  @Input() public currentElementSelectedData: any;
  @Input() public setDataProperty: (fieldName: string, fieldValue: any) => void;
  public pixabayResult: PixabayResult;
  public carouselImages: any[] = [];
  public isManagingImages = false;

  public get searchQuery() { return this.internalSearchQuery; }
  public set searchQuery(value) {
    this.internalSearchQuery = value;
    if (this.hasStarted) {
      this.search();
    }
  }

  constructor(private pixabayService: TccPixabayService) { }

  ngOnInit(): void {
    this.searchQuery = this.currentElementSelectedData.lastSearchValue;
    this.carouselImages = this.currentElementSelectedData.pixabayImages || [];
    if (typeof this.currentElementSelectedData.autoplay !== 'boolean') {
      this.currentElementSelectedData.autoplay = true;
    }
    this.search(this.searchQuery || '');
    this.hasStarted = true;
  }

  private search(searchQuery: string = this.searchQuery): void {
    this.pixabayService.search(searchQuery, 20)
      .pipe(debounceTime(500))
      .subscribe((res) => {
        if (this.currentElementSelectedData.lastSearchValue !== searchQuery) {
          this.setDataProperty('lastSearchValue', searchQuery);
        }
        this.pixabayResult = res;
      });
  }

  public removeImage(id: number, emitUpdate = true): void {
    const index = this.carouselImages.findIndex((o) => o.id === id);
    if (index !== -1) {
      this.carouselImages.splice(index, 1);
      if (emitUpdate) {
        this.setDataProperty('pixabayImages', this.carouselImages);
      }
    }
  }

  public clearAllImages(): void {
    this.carouselImages.splice(0);
    if (this.isManagingImages) {
      this.isManagingImages = false;
    }
    this.setDataProperty('pixabayImages', this.carouselImages);
  }

  public onImageSelect(item: PixabayHit): void {
    if (!item) {
      return;
    }
    if (this.carouselImages.find((o) => o.id === item.id)) {
      this.removeImage(item.id, false)
    } else {
      let imageUrl = item.previewURL;
      // TODO: Small hack for better image quality
      if (item.previewURL.endsWith('_150.jpg')) {
        imageUrl = imageUrl.replace('_150.jpg', '_640.jpg');
      }
      this.carouselImages.push({
        id: item.id,
        user: item.user,
        previewUrl: item.previewURL,
        imageUrl
      });
    }
    if (this.isManagingImages && !this.carouselImages.length) {
      this.isManagingImages = false;
    }
    this.setDataProperty('pixabayImages', this.carouselImages);
  }

  public isItemInCarousel(item: PixabayHit): boolean {
    return this.carouselImages.findIndex(i => i.id === item.id) !== -1;
  }
}
