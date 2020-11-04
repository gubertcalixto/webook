import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { PixabayResult, TccPixabayService } from 'projects/legacy-projects/tcc-pixabay/src/public-api';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'wb-pixabay-properties',
  templateUrl: './pixabay-properties.component.html',
  styleUrls: ['./pixabay-properties.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PixabayPropertiesComponent implements OnInit {
  private internalSearchQuery = '';
  private hasStarted = false;
  @Input() public currentElementSelectedData: any;
  @Input() public setDataProperty: (fieldName: string, fieldValue: any) => void;
  public result: PixabayResult;

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
    this.search(this.searchQuery || '');
    this.hasStarted = true;
  }

  private search(searchQuery: string = this.searchQuery): void {
    this.pixabayService.search(searchQuery)
      .pipe(debounceTime(500))
      .subscribe((res) => {
        this.setDataProperty('lastSearchValue', searchQuery);
        this.result = res;
      });
  }

  public onImageSelect(id: string): void {
    if (this.currentElementSelectedData.pixabayId !== id) {
      this.setDataProperty('pixabayId', id);
    }
  }
}
