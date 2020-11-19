import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@oath/services/user.service';
import { first } from 'rxjs/operators';
import { InfosOutput } from 'src/app/client/authentication';
import { EditorDocument } from 'src/app/client/webook';
import { getDecodedImage } from 'src/app/utils/base64-image-converter.const';

import { EditorDocumentPageService } from '../../editor-container/services/document-page.service';

@Component({
  selector: 'wb-document-card',
  templateUrl: './document-card.component.html',
  styleUrls: ['./document-card.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DocumentCardComponent {
  public userInfo: InfosOutput;
  public totalDocumentPages: number;
  public currentDocumentPage = 1;
  public defaultDocumentCover = '/assets/document/default-document.svg';
  @Input() public allowActions = false;
  @Input() public document: EditorDocument;
  @Input() public showUserInfo = true;
  @Output() public openEvent = new EventEmitter<string>();
  @Output() public deleteEvent = new EventEmitter<string>();

  constructor(
    private router: Router,
    public userService: UserService,
    public pageService: EditorDocumentPageService
  ) { }

  public openDocument(documentId: string): void {
    this.openEvent.next(documentId);
  }

  public deleteDocument(documentId: string): void {
    this.deleteEvent.next(documentId);
  }

  ngOnInit(): void {
    if (this.showUserInfo) {
      this.getUserBasicInfo();
    }
    this.getDocumentTotalPages();
  }

  private getDocumentTotalPages(): void {
    this.pageService.getPageCount(this.document.id).pipe(first()).subscribe((pageCount) => {
      this.totalDocumentPages = pageCount;
    });
  }

  private getUserBasicInfo(): void {
    this.userService.getUserBasicInfo(this.document.userId).pipe(first()).subscribe((userInfo: InfosOutput) => {
      this.userInfo = {
        name: userInfo.name,
        image: getDecodedImage(userInfo.image)
      };
    });
  }

  public redirectToUserPofile(): void {
    if (this.userService.userId !== this.document.userId) {
      this.router.navigateByUrl(`/user/profile/${this.document.userId}`);
    } else {
      this.router.navigateByUrl('/user/profile/my-profile');
    }
  }

  public goToNextDocumentPage(): void {
    this.currentDocumentPage += 1;
    this.getPageImage();
  }

  public goToPreviousDocumentPage(): void {
    this.currentDocumentPage -= 1;
    this.getPageImage();
  }

  private getPageImage(): void {
    this.pageService.getPageImage(this.document.id, this.currentDocumentPage).pipe(first()).subscribe((page) => {
      this.document.image = page.image;
    });
  }
}
