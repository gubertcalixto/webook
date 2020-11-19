import { ElementRef, Injector } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { EditorInteractionService } from 'src/app/editor-container/services/interactions/editor-interaction.service';
import { LikeService } from 'src/app/editor-container/services/interactions/like.service';
import { ProfileService } from 'src/app/services/profile.service';

import { EditorObjectTypeEnum, HasLikeOrDislikeOutputEnum, NotificationTypeEnum } from '../../../../../client/webook';
import { EditorBaseElement } from './editor-base-element';

export abstract class EditorInteractionsBaseElement extends EditorBaseElement {
  public doesComponentHasLike: boolean;
  public doesComponentHasDislike: boolean;
  public isLoadingLikeAndDislike = true;
  public documentId: string;
  private hasAlreadyDoneLikeOrDislikeRequest: boolean;
  private likeService: LikeService;
  private profileService: ProfileService;
  private activatedRoute: ActivatedRoute;
  public editorInteractionService: EditorInteractionService;

  constructor(

    public elementRef: ElementRef<HTMLElement>,
    injector: Injector
  ) {
    super(elementRef);
    this.likeService = injector.get(LikeService);
    this.profileService = injector.get(ProfileService);
    this.activatedRoute = injector.get(ActivatedRoute);
    this.editorInteractionService = injector.get(EditorInteractionService);
  }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(first()).subscribe((params) => {
      this.documentId = params.id;
    });
  }

  public getHasLikeOrDislikeForInteractionsPopover(isOpened: boolean) {
    if (isOpened && !this.hasAlreadyDoneLikeOrDislikeRequest) {
      this.hasLikeOrDislikeForComponent();
    }
  }

  private hasLikeOrDislikeForComponent(): void {
    this.hasAlreadyDoneLikeOrDislikeRequest = true;
    this.likeService.hasLikeOrDislike(EditorObjectTypeEnum.NUMBER_2, this.elementId)
      .pipe(first())
      .subscribe(result => {
        this.hasAlreadyDoneLikeOrDislikeRequest = true;
        this.doesComponentHasLike = result === HasLikeOrDislikeOutputEnum.NUMBER_0;
        this.doesComponentHasDislike = result === HasLikeOrDislikeOutputEnum.NUMBER_1;
        this.isLoadingLikeAndDislike = false;
      }, () => {
        this.hasAlreadyDoneLikeOrDislikeRequest = false;
        this.isLoadingLikeAndDislike = false;
      });
  }

  public likeComponent(): void {
    this.likeService.like({
      objectTypeEnum: EditorObjectTypeEnum.NUMBER_2,
      objectId: this.elementId
    })
      .pipe(first())
      .subscribe(() => {
        this.doesComponentHasLike = true;
        this.profileService.saveNotification({
          notificationType: NotificationTypeEnum.NUMBER_1,
          documentId: this.documentId,
        })
          .pipe(first())
          .subscribe();
      });
  }

  public dislikeComponent(): void {
    this.likeService.dislike({
      objectTypeEnum: EditorObjectTypeEnum.NUMBER_2,
      objectId: this.elementId
    })
      .pipe(first())
      .subscribe(() => {
        this.doesComponentHasDislike = true;
        this.profileService
          .saveNotification({
            notificationType: NotificationTypeEnum.NUMBER_2,
            documentId: this.documentId,
          })
          .pipe(first())
          .subscribe();
      });
  }

  public removeLikeComponent(): void {
    this.likeService.removeLike(EditorObjectTypeEnum.NUMBER_2, this.elementId)
      .pipe(first())
      .subscribe(() => {
        this.doesComponentHasLike = false;
      });
  }

  public removeDislikeComponent(): void {
    this.likeService.removeDislike(EditorObjectTypeEnum.NUMBER_2, this.elementId)
      .pipe(first())
      .subscribe(() => {
        this.doesComponentHasDislike = false;
      });
  }
}
