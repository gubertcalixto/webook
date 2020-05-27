import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'wb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  public isCollapsed = false;
  public hasNotification = true;

  public toogleSidenavCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  public notificationClicked(): void {
    if (this.hasNotification) {
      this.hasNotification = false;
    }
  }
}
