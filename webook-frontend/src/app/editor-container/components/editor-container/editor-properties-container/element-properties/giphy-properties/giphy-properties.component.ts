import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { GiphyItemListResult, TccGiphyService } from 'projects/legacy-projects/tcc-giphy/src/public-api';
import { debounceTime, first } from 'rxjs/operators';

@Component({
  selector: 'wb-giphy-properties',
  templateUrl: './giphy-properties.component.html',
  styleUrls: ['./giphy-properties.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GiphyPropertiesComponent implements OnInit {
  private internalSearchQuery = '';
  private hasStarted = false;
  @Input() public currentElementSelectedData: any;
  @Input() public setDataProperty: (fieldName: string, fieldValue: any) => void;
  public result: GiphyItemListResult;

  public get searchQuery() { return this.internalSearchQuery; }
  public set searchQuery(value) {
    this.internalSearchQuery = value;
    if (this.hasStarted) {
      this.search();
    }
  }

  constructor(private giphyService: TccGiphyService) { }

  ngOnInit(): void {
    this.searchQuery = this.currentElementSelectedData.lastSearchValue;
    if (this.searchQuery) {
      this.search();
    }
    this.hasStarted = true;
  }

  public search(searchQuery: string = this.searchQuery): void {
    if (!searchQuery) {
      this.setDataProperty('lastSearchValue', searchQuery);
      return;
    }
    this.giphyService.search(searchQuery, 'gifs', 25)
      .pipe(debounceTime(500), first())
      .subscribe((res) => {
        this.setDataProperty('lastSearchValue', searchQuery);
        this.result = res;
      });
  }

  public onGiphySelect(id: string): void {
    if (this.currentElementSelectedData.giphyId !== id) {
      this.setDataProperty('giphyId', id);
    }
  }
}
