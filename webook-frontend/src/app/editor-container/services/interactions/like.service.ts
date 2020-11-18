import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  EditorObjectTypeEnum,
  HasLikeOrDislikeOutputEnum,
  LikeDislikeInput,
  LikeDislikeServiceProxy,
} from 'src/app/client/webook';

@Injectable()
export class LikeService {
  constructor(private likeDislikeService: LikeDislikeServiceProxy) {}

  public like(likeDislikeInput?: LikeDislikeInput): Observable<any> {
    return this.likeDislikeService.interactionLikePost(likeDislikeInput);
  }

  public hasLike(objectTypeEnum?: EditorObjectTypeEnum, objectId?: string): Observable<boolean> {
    return this.likeDislikeService.interactionLikeGet(objectTypeEnum, objectId);
  }

  public removeLike(objectTypeEnum?: EditorObjectTypeEnum, objectId?: string): Observable<boolean> {
    return this.likeDislikeService.interactionLikeDelete(objectTypeEnum, objectId);
  }
  
  public dislike(likeDislikeInput?: LikeDislikeInput): Observable<any> {
    return this.likeDislikeService.interactionDislikePost(likeDislikeInput);
  }

  public hasDislike(objectTypeEnum?: EditorObjectTypeEnum, objectId?: string): Observable<boolean> {
    return this.likeDislikeService.interactionDislikeGet(objectTypeEnum, objectId);
  }

  public removeDislike(objectTypeEnum?: EditorObjectTypeEnum, objectId?: string): Observable<boolean> {
    return this.likeDislikeService.interactionDislikeDelete(objectTypeEnum, objectId);
  }

  public hasLikeOrDislike(objectTypeEnum?: EditorObjectTypeEnum, objectId?: string): Observable<HasLikeOrDislikeOutputEnum> {
    return this.likeDislikeService.interactionLikeOrDislikeGet(objectTypeEnum, objectId);
  }
}
