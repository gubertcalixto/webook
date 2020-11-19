import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '@oath/services/user.service';
import { FaIconsModule } from '@shared/components';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { ProfileService } from 'src/app/services/profile.service';

import { CommentService } from '../../services/interactions/comment.service';
import { EditorCommentSidebarComponent } from './editor-comment-sidebar/editor-comment-sidebar.component';

@NgModule({
  declarations: [EditorCommentSidebarComponent],
  imports: [
    CommonModule,
    FormsModule,
    FaIconsModule,

    NzAvatarModule,
    NzButtonModule,
    NzCommentModule,
    NzEmptyModule,
    NzInputModule,
    NzFormModule,
    NzSpinModule,
    NzToolTipModule,
    NzTypographyModule,
  ],
  exports: [EditorCommentSidebarComponent],
  providers: [UserService, CommentService, ProfileService],
})
export class EditorInteractionsModule {}
