import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { OauthManagerService } from '@oath/services/oauth-manager.service';
import { Subscription } from 'rxjs';
import { EditorDocument } from 'src/app/client/webook';

import { FeedService } from './feed.service';

@Component({
  selector: 'wb-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FeedComponent implements OnInit {
  private subs: Subscription[] = [];
  public documents: EditorDocument[] = [];
  public documentsTotalCount: number;
  public isLoadingFeed = false;
  public documentsPageSize = 20;
  public documentsPageIndex = 1;

  constructor(
    private router: Router,
    private feedService: FeedService,
    public oauthManagerService: OauthManagerService,
  ) { }

  ngOnInit(): void {
    this.getFeed();
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  public getFeed(): void {
    this.isLoadingFeed = true;
    const skipCount = (this.documentsPageIndex - 1) * this.documentsPageSize;
    this.subs.push(
      this.feedService.getFeed(skipCount, this.documentsPageSize).subscribe(result => {
        this.documents = result.items;
        this.documentsTotalCount = result.totalCount;
        this.isLoadingFeed = false;
      })
    );
  }

  public openDocument(documentId: string): void {
    // TODO: Visualize Mode
    console.log('Abrindo documento: ' + documentId);
    // this.router.navigateByUrl(`/document/${documentId}`);
  }
}