import { Component, ElementRef, ViewEncapsulation } from '@angular/core';

import { EditorResizeBaseElement } from '../editor-element-base-classes/resize/editor-resize-base-element';

@Component({
  selector: 'wb-editor-youtube-element',
  templateUrl: './editor-youtube-element.component.html',
  styleUrls: ['./editor-youtube-element.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditorYoutubeElementComponent extends EditorResizeBaseElement {
  public elementTypeId = 'wb-youtube';
  public startSecond = 0;
  public endSecond: number;
  public videoDuration: number;
  public url: string;
  public duringVideoValidation: boolean;
  private isInitingData = true;
  private videoChanged: boolean;
  private currentPlayer: YT.PlayerEvent;

  constructor(public elementRef: ElementRef<HTMLElement>) {
    super(elementRef);
  }

  ngOnInit(): void {
    const hasLoadYoutube = window['__has_load_youtube'];
    if (!hasLoadYoutube) {
      window['__has_load_youtube'] = true;
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
    }
  }

  protected setInitialSize(): void {
    const width = this.frame.get('width');
    const height = this.frame.get('height');
    let hasAlteredSize = false;
    if (width === undefined || width === null || width === 'unset') {
      this.frame.set('width', '200px');
      hasAlteredSize = true;
    }
    if (height === undefined || height === null || height === 'unset') {
      this.frame.set('height', '200px');
      hasAlteredSize = true;
    }
    if (hasAlteredSize) {
      this.updateFrame();
    }
  }

  protected setData(): void {
    if (this.url !== this.data.youtubeUrl) {
      this.url = this.data.youtubeUrl;
      if (!this.isInitingData) {
        this.videoChanged = true;
      }
    }
    if (this.startSecond !== this.data.startSecond) {
      this.startSecond = this.data.startSecond || 0;
    }
    if (this.endSecond !== this.data.endSecond) {
      this.endSecond = this.data.endSecond;
    }
    if (this.videoDuration !== this.data.videoDuration) {
      this.videoDuration = this.data.videoDuration;
    }
    this.isInitingData = false;
  }

  public onVideoReady(player: YT.PlayerEvent): void {
  }

  public onVideoChanged(player: YT.PlayerEvent): void {
    if (!this.videoChanged || !this.url) {
      this.currentPlayer = player;
      return;
    }
    this.currentPlayer = player;
    this.videoChanged = false;
    this.duringVideoValidation = true;
    this.currentPlayer.target.mute();
    this.currentPlayer.target.playVideo();
    let tries = 0;
    const proceedWhenPlayerIsReady = () => {
      setTimeout(() => {
        if (this.currentPlayer.target.getDuration() === 0 && tries <= 10) {
          tries++;
            proceedWhenPlayerIsReady();
        } else {
          this.videoDuration = this.currentPlayer.target.getDuration();
          if (tries > 10) {
            this.data.videoDuration = 0
            this.data.youtubeUrl = undefined;
            this.setData();
            this.emitChange()
          } else {
            if (this.data.videoDuration !== this.videoDuration) {
              this.data.videoDuration = this.videoDuration;
              this.emitChange();
            }
          }
          this.currentPlayer.target.stopVideo();
          this.currentPlayer.target.unMute();
          this.duringVideoValidation = false;
        }
      }, 100);
    }
    proceedWhenPlayerIsReady();
  }

  public onVideoError(player: YT.PlayerEvent): void {
    // debugger
    // this.videoDuration = player.target.getDuration();
    // if (this.data.videoDuration !== this.videoDuration) {
    //   this.data.videoDuration = this.videoDuration;
    //   this.emitChange();
    // }
  }
}
