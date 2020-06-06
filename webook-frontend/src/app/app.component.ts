import { Component, ViewEncapsulation } from '@angular/core';
import { TitleResolverService } from '@shared/utils';

@Component({
  selector: 'wb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  constructor(titleResolverService: TitleResolverService) {
    titleResolverService.startTitleResolver();
  }
}
