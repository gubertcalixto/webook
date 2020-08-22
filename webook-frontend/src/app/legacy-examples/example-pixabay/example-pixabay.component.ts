import { Component, OnDestroy } from '@angular/core';
import { PixabayResult, TccPixabayService } from 'projects/legacy-projects/tcc-pixabay/src/public-api';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { NavigationService } from 'src/app/navigation/navigation.service';

@Component({
  selector: 'app-example-pixabay',
  templateUrl: './example-pixabay.component.html',
  styleUrls: ['./example-pixabay.component.scss']
})
export class ExamplePixabayComponent implements OnDestroy {
  result: PixabayResult;
  subs: Subscription[] = [];

  constructor(private service: TccPixabayService, private navigationService: NavigationService) {
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
