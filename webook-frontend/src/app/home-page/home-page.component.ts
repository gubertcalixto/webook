import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { documentCreationModels } from './tokens/consts/document-creation-models.const';
import { DocumentCreationModel } from './tokens/classes/document-creation-model.class';

@Component({
  selector: 'wb-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomePageComponent implements OnInit {
  public isAddContainerOpened = true;
  public createDocumentViewExpanded = false;
  public shouldHaveCreateDocumentViewExpanded = false;
  private maximumCreatDocumenModelSize = 5;

  public get createDocumentModels() {
    if (!this.createDocumentViewExpanded) {
      return documentCreationModels.slice(0, this.maximumCreatDocumenModelSize);
    }
    return documentCreationModels;
  }

  ngOnInit(): void {
    this.shouldHaveCreateDocumentViewExpanded = documentCreationModels.length > this.maximumCreatDocumenModelSize;
  }

  public toggleCreateDocumentView(): void {
    this.createDocumentViewExpanded = !this.createDocumentViewExpanded;
  }

  public createDocument(model?: DocumentCreationModel){
    // TODO Create Document
  }
}
