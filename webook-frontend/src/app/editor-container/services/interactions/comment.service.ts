import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CommentServiceProxy,
  CreateCommentInput,
  EditorInteractionComment,
  EditorObjectTypeEnum,
  UpdateCommentInput,
} from 'src/app/client/webook';

@Injectable()
export class CommentService {
  constructor(private commentService: CommentServiceProxy) { }

  public getComment(interactionId: string, objectId?: string, objectTypeEnum?: EditorObjectTypeEnum): Observable<EditorInteractionComment> {
    return this.commentService.interactionCommentInteractionIdGet(interactionId, objectId, objectTypeEnum);
  }

  public comment(commentInput: CreateCommentInput): Observable<any> {
    return this.commentService.interactionCommentsPost(commentInput);
  }

  public updateComment(interactionId: string, commentInput: UpdateCommentInput): Observable<any> {
    return this.commentService.interactionCommentInteractionIdPut(interactionId, commentInput);
  }

  public removeComment(interactionId: string, objectId?: string, objectTypeEnum?: EditorObjectTypeEnum): Observable<any> {
    return this.commentService.interactionCommentInteractionIdDelete(interactionId, objectId, objectTypeEnum);
  }

  public getComments(objectId?: string, objectTypeEnum?: EditorObjectTypeEnum, interactionId?: string): Observable<EditorInteractionComment[]> {
    return this.commentService.interactionCommentsGet(objectId, objectTypeEnum, interactionId);
  }
}
