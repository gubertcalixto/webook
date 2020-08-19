import { Component, OnDestroy } from '@angular/core';
import { GiphyItemListResult, TccGiphyService } from 'projects/tcc-giphy/src/public-api';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { NavigationService } from 'src/app/navigation/navigation.service';

@Component({
  selector: 'app-example-giphy',
  templateUrl: './example-giphy.component.html',
  styleUrls: ['./example-giphy.component.scss']
})
export class ExampleGiphyComponent implements OnDestroy {
  result: GiphyItemListResult;
  subs: Subscription[] = [];

  constructor(private service: TccGiphyService, private navigationService: NavigationService) {
    this.subs.push(this.navigationService.search.subscribe(v => {
      if (!v) { this.result = undefined; } else { this.search(v); }
    }));
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  public search(value: string): void {
    this.service.search(value)
      .pipe(debounceTime(300))
      .subscribe(res => {
        this.result = res;
      });
  }
}
