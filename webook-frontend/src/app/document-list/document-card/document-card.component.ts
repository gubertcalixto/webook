import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { UserService } from '@oath/services/user.service';
import { EditorDocument } from 'src/app/client/webook';

@Component({
  selector: 'wb-document-card',
  templateUrl: './document-card.component.html',
  styleUrls: ['./document-card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DocumentCardComponent {
  public defaultDocumentCover = '/assets/document/default-document.svg';
  @Input() public allowActions = false;
  @Input() public document: EditorDocument;
  @Output() public openEvent = new EventEmitter<string>();
  @Output() public deleteEvent = new EventEmitter<string>();

  constructor(public userService: UserService) { }

  public openDocument(documentId: string): void {
    this.openEvent.next(documentId);
  }

  public deleteDocument(documentId: string): void {
    this.deleteEvent.next(documentId);
  }
}
