import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OauthManagerService } from '@oath/services/oauth-manager.service';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'wb-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit, OnDestroy {
  private subs: Subscription[] = [];
  constructor(
    public oAuthManagerService: OauthManagerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.subs.push(this.oAuthManagerService.finishedLoadingSubject
      .pipe(switchMap(res => this.oAuthManagerService.hasValidToken()))
      .subscribe(res => {
        if (res) {
          this.router.navigateByUrl('/home');
        }
      }));
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  public login(): void {
    this.oAuthManagerService.login();
  }
}
