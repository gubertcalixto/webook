import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '@oath/services/user.service';
import { OAuthUser } from '@oath/tokens/oauth-user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'wb-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserProfileComponent implements OnInit, OnDestroy {
  private subs: Subscription[] = [];
  public userId: string;
  public user: OAuthUser;

  constructor(
    private activatedRoute: ActivatedRoute,
    public userService: UserService
  ) { }

  ngOnInit(): void {
    this.subs.push(this.activatedRoute.params.subscribe(params => {
      this.userId = params.id;
      if (!this.userId) {
        this.subs.push(this.userService.userSubject.subscribe(user => {
          this.user = user;
        }));
      }
    }));
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  public follow(): void {
    console.log('follow');
  }
}
