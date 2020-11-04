import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'wb-youtube-properties',
  templateUrl: './youtube-properties.component.html',
  styleUrls: ['./youtube-properties.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class YoutubePropertiesComponent implements OnInit {
  @Input() public currentElementSelectedData: any;
  @Input() public setDataProperty: (fieldName: string, fieldValue: any) => void;
  public startTimeSelected: Date;
  public endTimeSelected: Date;
  public invalidUrl = false;

  ngOnInit(): void {
    this.setInternalStartTime();
    this.setInternalEndTime();
  }

  public setYoutubeUrl(url: string): void {
    this.invalidUrl = false;
    if (!url) {
      this.setDataProperty('youtubeUrl', url);
      return;
    }
    const setUrlAsInvalid = () => {
      this.invalidUrl = true;
      setTimeout(() => {
        this.invalidUrl = false;
      }, 5000);
    }
    const shouldNotContainRegex = /(\/|watch|\?|v=|=)/;
    if (shouldNotContainRegex.test(url)) {
      const youtubeRegex = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
      const regexResult = url.match(youtubeRegex);
      if (regexResult?.length >= 2) {
        const videoId = regexResult[1];
        if (this.currentElementSelectedData.youtubeUrl !== videoId) {
          this.setDataProperty('youtubeUrl', videoId);
          this.setDataProperty('videoDuration', undefined);
        }
        return;
      } else {
        this.setDataProperty('youtubeUrl', undefined);
        this.setDataProperty('videoDuration', undefined);
        setUrlAsInvalid();
      }
    } else {
      if (url.length > 11) {
        setUrlAsInvalid();
        return;
      }
      if (this.currentElementSelectedData.youtubeUrl !== url) {
        this.setDataProperty('youtubeUrl', url);
        this.setDataProperty('videoDuration', undefined);
      }
    }
  }

  public setTime(isStart: boolean, event: Date): void {
    const minute = event?.getMinutes() || 0;
    const seconds = event?.getSeconds() || 0;
    const dateInSeconds = event
      ? (minute * 60) + seconds
      : undefined
    if (isStart) {
      this.setDataProperty('startSecond', dateInSeconds);
      this.setInternalStartTime();
    } else {
      this.setDataProperty('endSecond', dateInSeconds);
      this.setInternalEndTime();
    }
  }

  private setInternalStartTime(): void {
    if (typeof this.currentElementSelectedData?.startSecond === 'undefined') {
      this.startTimeSelected = undefined;
      return;
    }
    const timeInSeconds = this.startTimeSelected ? ((this.startTimeSelected.getMinutes() || 0) * 60) + this.startTimeSelected.getSeconds() : undefined;
    if (this.currentElementSelectedData.startSecond === timeInSeconds) {
      return;
    }
    const minute = Math.floor(this.currentElementSelectedData.startSecond / 60);
    const seconds = Math.floor(this.currentElementSelectedData.startSecond % 60);
    const date = new Date();
    date.setMinutes(minute, seconds, 0);
    this.startTimeSelected = date;
    if (this.endTimeSelected && this.startTimeSelected > this.endTimeSelected) {
      this.setTime(false, new Date(this.startTimeSelected.getTime()));
    }
  }

  private setInternalEndTime(): void {
    if (typeof this.currentElementSelectedData?.endSecond === 'undefined') {
      this.endTimeSelected = undefined;
      return;
    }
    const timeInSeconds = this.endTimeSelected ? ((this.endTimeSelected.getMinutes() || 0) * 60) + this.endTimeSelected.getSeconds() : undefined;
    if (this.currentElementSelectedData.endSecond === timeInSeconds) {
      return;
    }
    const minute = Math.floor(this.currentElementSelectedData.endSecond / 60);
    const seconds = Math.floor(this.currentElementSelectedData.endSecond % 60);
    const date = new Date();
    date.setMinutes(minute, seconds, 0);
    this.endTimeSelected = date;
    if (this.startTimeSelected && this.startTimeSelected > this.endTimeSelected) {
      this.setTime(true, new Date(new Date().getFullYear(), new Date().getMonth(), 1, 0, 0, 0, 0));
    }
  }
}
