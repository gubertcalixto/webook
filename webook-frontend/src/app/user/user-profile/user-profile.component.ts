import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '@oath/services/user.service';
import { OAuthUser } from '@oath/tokens/oauth-user';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { EditorDocument } from 'src/app/client/webook';
import { DocumentService } from 'src/app/services/document.service';
import { ProfileService } from 'src/app/services/profile.service';
import { base64Encode, getDecodedImage } from 'src/app/utils/base64-image-converter.const';

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
  public isFollowingUserLoading = true;
  public isFollowingUser = false;
  public isUserImageLoading = true;
  public userImage: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private profileService: ProfileService,
    private documentService: DocumentService,
    private notificationService: NzNotificationService,
    public userService: UserService,
  ) { }

  ngOnInit(): void {
    this.subs.push(this.activatedRoute.params.subscribe(params => {
      this.userId = params.id;
      this.isMyUser = !Boolean(this.userId);

      if (this.isMyUser) {
        this.getMyUser();
      } else {
        this.getUser();
        this.getIsFollowingUser();
      }
    }));
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  private getMyUser(): void {
    this.subs.push(this.userService.userSubject.subscribe(user => {
      if (!user) {
        return;
      }
      this.user = user;
      this.userId = this.user.userId;
      this.initialProcess();
    }));
  }

  private getUser(): void {
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
    }));
  }

  private getIsFollowingUser(): void {
    this.profileService.isFollowUser(this.userId).subscribe(isFollowing => {
      this.isFollowingUser = isFollowing;
      this.isFollowingUserLoading = false;
    });
  }

  public initialProcess(): void {
    this.getFollowersNumber();
    this.getDocumentsNumber();
    this.getProfileDocuments();
    this.getUserImage();
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
    this.subs.push(this.documentService.getUserDocuments(this.userId, skipCount, this.userDocumentsPageSize).subscribe(res => {
      this.userDocuments = res.items;
      this.userDocumentsTotalCount = res.totalCount;
      this.isLoadingUserDocuments = false;
    }));
  }

  public openDocument(documentId: string, editMode = false): void {
    if (editMode) {
      this.router.navigateByUrl(`/document/${documentId}`);
    } else {
      this.router.navigateByUrl(`/document/${documentId}/view`);
    }
  }

  public deleteDocument(documentId: string): void {
    const documentToDelete = this.userDocuments.find(d => d.id === documentId);
    this.subs.push(this.documentService.deleteDocument(documentId)
      .subscribe(() => {
        this.getProfileDocuments();
        const message = documentToDelete ? `O documento "${documentToDelete.title}" foi deletado com sucesso` : '';
        this.notificationService.success('Documento deletado', message);
      }));
  }

  public createDocument(): void {
    this.subs.push(this.documentService.createDocument()
      .subscribe(document => {
        this.openDocument(document.id, true);
      }));
  }

  public follow(): void {
    this.subs.push(this.profileService.followUser(this.userId).subscribe(() => {
      this.isFollowingUser = true;
      this.notificationService.success('Você está seguindo este usuário', '');
      this.getFollowersNumber();
    }));
  }

  public unfollow(): void {
    this.subs.push(this.profileService.unfollowUser(this.userId).subscribe(() => {
      this.isFollowingUser = false;
      this.notificationService.info('Você parou de seguir este usuário', '');
      this.getFollowersNumber();
    }));
  }

  public onEditUserImage(event: any): void {
    if (!this.isMyUser || event?.target?.files?.length !== 1) {
      return;
    }
    this.isUserImageLoading = true;
    const imageToUpload = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(imageToUpload);
    reader.onload = () => {
      const base64Image = 'data:image/png;base64,' + base64Encode(reader.result.toString().split(',')[1]);
      this.updateUserImage(base64Image);
    };
  }

  private getUserImage(): void {
    this.userService.getUserImage(this.userId).pipe(first()).subscribe(resultImage => {
      this.userImage = getDecodedImage(resultImage);
      this.isUserImageLoading = false;
    });
  }

  private updateUserImage(image: string): void {
    this.userService.updateUserImage(image).pipe(first()).subscribe(resultImage => {
      this.userImage = getDecodedImage(resultImage);
      this.isUserImageLoading = false;
      this.notificationService.success('Imagem de perfil atualizada', '');
    });
  }
}
