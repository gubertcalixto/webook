import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from '@oath/services/user.service';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { InfosOutput } from 'src/app/client/authentication';
import {
  CreateCommentInput,
  EditorInteractionComment,
  EditorObjectTypeEnum,
  NotificationTypeEnum,
} from 'src/app/client/webook';
import { CommentService } from 'src/app/editor-container/services/interactions/comment.service';
import { ProfileService } from 'src/app/services/profile.service';
import { getDecodedImage } from 'src/app/utils/base64-image-converter.const';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'wb-editor-comment-sidebar',
  templateUrl: './editor-comment-sidebar.component.html',
  styleUrls: ['./editor-comment-sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditorCommentSidebarComponent implements OnInit {
  @Input() public objectTypeEnum: EditorObjectTypeEnum;
  @Input() public objectId: string;
  public comments: EditorInteractionComment[];
  public isLoadingComments = true;
  public comment_return: EditorInteractionComment;
  public isSendingComment: boolean;
  public documentId: string;

  constructor(
    private commentService: CommentService,
    private profileService: ProfileService,
    public userService: UserService
  ) { }

  ngOnInit(): void {
    this.getComments();
    const pathArray = window.location.pathname.split('/');
    this.documentId = pathArray[2];
  }

  private getComments(): void {
    this.isLoadingComments = true;
    this.commentService.getComments(this.objectId, this.objectTypeEnum).pipe(first()).subscribe((result) => {
      this.comments = result;
      this.isLoadingComments = false;
    });
  }

  public sendComment(message: string): void {
    if (this.isSendingComment) {
      return;
    }
    this.isSendingComment = true;
    const input: CreateCommentInput = {
      message,
      objectId: this.objectId,
      objectTypeEnum: this.objectTypeEnum,
      interactionId: uuid()
    }
    this.commentService.comment(input).pipe(first()).subscribe(() => {
      this.getComments();
      this.profileService.saveNotification({
        notificationType: NotificationTypeEnum.NUMBER_0,
        documentId: this.documentId,
      })
        .pipe(first())
        .subscribe();
      this.isSendingComment = false;
    }, () => {
      this.isSendingComment = false;
    });
  }

  public toggleReplyComment(comment: EditorInteractionComment): void {
    if (!comment) {
      return;
    }
    const shouldAllowReply = !Boolean(comment['allowReply']);
    this.comments.forEach(comment => {
      if (comment['allowReply']) {
        delete comment['allowReply'];
      }
    });
    if (shouldAllowReply) {
      comment['allowReply'] = true;
    }
  }

  public sendCommentChild(message: string, comment: EditorInteractionComment): void {
    this.isSendingComment = true;
    const input: CreateCommentInput = {
      message,
      objectId: this.objectId,
      objectTypeEnum: this.objectTypeEnum,
      parentId: comment.id,
      interactionId: uuid()
    }
    this.commentService.comment(input).pipe(first()).subscribe(() => {
      this.getComments();
      this.profileService
        .saveNotification({
          notificationType: NotificationTypeEnum.NUMBER_0,
          documentId: this.documentId,
        })
        .pipe(first())
        .subscribe();
      this.isSendingComment = false;
    }, () => {
      this.isSendingComment = false;
    });
  }

  public getUserInfo(userId: string): Observable<{ nome?: string; imagem?: string }> {
    return this.userService.getUserBasicInfo(userId).pipe(
      map((userinfo: InfosOutput) => ({
        image: getDecodedImage(userinfo.image),
        nome: userinfo.name
      }))
    );
  }

  public removeComment(comment: EditorInteractionComment): void {
    if (comment.userId !== this.userService.userId) {
      return;
    }
    this.commentService.removeComment(comment.interactionId, this.objectId, this.objectTypeEnum).pipe(first()).subscribe(() => {
      this.getComments();
    });
  }
}
