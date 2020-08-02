import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '@oath/services/user.service';
import { OAuthUser } from '@oath/tokens/oauth-user';
import { Subscription } from 'rxjs';
import { EditorDocument } from 'src/app/client/webook';
import { DocumentService } from 'src/app/services/document.service';
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
  public isMyUser = true;
  public userDocuments: EditorDocument[] = [];
  public userDocumentsTotalCount: number;
  public isLoadingUserDocuments = false;
  public userDocumentsPageSize = 20;
  public userDocumentsPageIndex = 1;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private profileService: ProfileService,
    private documentService: DocumentService,
    public userService: UserService,
  ) { }

  ngOnInit(): void {
    this.subs.push(this.activatedRoute.params.subscribe(params => {
      this.userId = params.id;
      this.isMyUser = !Boolean(this.userId);

      if (this.isMyUser) {
        this.subs.push(this.userService.userSubject.subscribe(user => {
          if (!user) {
            return;
          }
          this.user = user;
          this.userId = this.user.userId;
          this.initialProcess();
        }));
      } else {
        this.subs.push(this.userService.getUserById(this.userId).subscribe(userResult => {
          if (userResult) {
            this.user = {
              email: userResult.email,
              firstName: userResult.firstName,
              lastName: userResult.secondName,
              userName: `${userResult.firstName} ${userResult.secondName}`,
              userId: userResult.id
            };
            this.initialProcess();
          }
        }))
      }
    }));
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  public initialProcess(): void {
    this.getFollowersNumber();
    this.getDocumentsNumber();
    this.getProfileDocuments();
  }

  public getFollowersNumber(): void {
    this.subs.push(this.profileService.getFollowersNumber(this.userId).subscribe(followersNumber => {
      this.userFollowersNumber = followersNumber;
    }));
  }

  public getDocumentsNumber(): void {
    this.subs.push(this.profileService.getDocumentsNumber(this.userId).subscribe(documentsNumber => {
      this.userDocumentsNumber = documentsNumber;
    }));
  }

  public getProfileDocuments(): void {
    this.isLoadingUserDocuments = true;
    const skipCount = (this.userDocumentsPageIndex - 1) * this.userDocumentsPageSize;
    this.subs.push(
      this.documentService.getUserDocuments(this.userId, skipCount, this.userDocumentsPageSize).subscribe(res => {
        this.userDocuments = res.items;
        this.userDocumentsTotalCount = res.totalCount;
        this.isLoadingUserDocuments = false;
      })
    );
  }

  public openDocument(documentId: string, editMode = false): void {
    // TODO: Visualize Mode
    if (editMode) {
      this.router.navigateByUrl(`/document/${documentId}`);
    }
  }

  public deleteDocument(documentId: string): void {
    // TODO
    console.log('deleteDocument')
  }

  public createDocument(): void {
    this.subs.push(this.documentService.createDocument()
      .subscribe(document => {
        this.openDocument(document.id, true);
      }));
  }

  public follow(): void {
    console.log('follow');
    this.subs.push(this.profileService.followUser().subscribe(result => {
      // notificar usuário
      this.getFollowersNumber();
    }));
  }

  public unfollow(): void {
    console.log('unfollow');
    this.subs.push(this.profileService.unfollowUser().subscribe(result => {
      // se usar unsebscribe pede a criação na página observable.
      // notificar usuário
      this.getFollowersNumber();
    }));
  }
}
