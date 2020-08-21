import { Component, OnDestroy } from '@angular/core';
import { PexelsResult, TccPexelsService } from 'projects/legacy-projects/tcc-pexels/src/public-api';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { NavigationService } from 'src/app/navigation/navigation.service';

@Component({
  selector: 'app-example-pexels',
  templateUrl: './example-pexels.component.html',
  styleUrls: ['./example-pexels.component.scss']
})
export class ExamplePexelsComponent implements OnDestroy {
  result: PexelsResult;
  subs: Subscription[] = [];

  constructor(private service: TccPexelsService, private navigationService: NavigationService) {
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
