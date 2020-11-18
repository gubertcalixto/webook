import { ElementRef, Injector } from '@angular/core';
import { first } from 'rxjs/operators';
import { LikeService } from 'src/app/editor-container/services/interactions/like.service';

import { EditorObjectTypeEnum, HasLikeOrDislikeOutputEnum } from '../../../../../client/webook';
import { EditorBaseElement } from './editor-base-element';

export abstract class EditorInteractionsBaseElement extends EditorBaseElement {
  public doesComponentHasLike: boolean;
  public doesComponentHasDislike: boolean;
  public isLoadingLikeAndDislike = true;
  private hasAlreadyDoneLikeOrDislikeRequest: boolean;
  private likeService: LikeService;

  constructor(
    public elementRef: ElementRef<HTMLElement>,
    injector: Injector
  ) {
    super(elementRef);
    this.likeService = injector.get(LikeService);
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
