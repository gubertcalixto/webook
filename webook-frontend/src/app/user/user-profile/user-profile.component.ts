import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '@oath/services/user.service';
import { OAuthUser } from '@oath/tokens/oauth-user';
import { Subscription } from 'rxjs';
import { ProfileService } from 'src/app/services/profile.service';

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
  public userFollowersNumber = -1;
  public userDocumentsNumber = -1;

  constructor(
    private activatedRoute: ActivatedRoute,
    private profileService: ProfileService,
    public userService: UserService,
  ) { }

  ngOnInit(): void {
    this.subs.push(this.activatedRoute.params.subscribe(params => {
      this.userId = params.id;
      if (!this.userId) {
        this.subs.push(this.userService.userSubject.subscribe(user => {
          if (!user) {
            return;
          }
          this.user = user;
          this.userId = this.user.userId;
          this.getFollowersNumber();
          this.getDocumentsNumber();
        }));
      }
    }));
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  public getFollowersNumber() {
    this.subs.push(this.profileService.getFollowersNumber(this.userId).subscribe(followersNumber => {
      this.userFollowersNumber = followersNumber;
    }));
  }

  public getDocumentsNumber() {
    this.subs.push(this.profileService.getDocumentsNumber(this.userId).subscribe(documentsNumber => {
      this.userDocumentsNumber = documentsNumber;
    }));
  }

  public follow(): void {
    console.log('follow');
  }
}
