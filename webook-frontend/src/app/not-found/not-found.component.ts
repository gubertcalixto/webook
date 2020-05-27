import { AfterViewInit, Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'wb-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NotFoundComponent implements AfterViewInit {
  @ViewChild('video', { static: false }) private videoRef: ElementRef<HTMLVideoElement>;

  ngAfterViewInit(): void {
    this.videoRef.nativeElement.muted = true;
    this.videoRef.nativeElement.play();
  }
}
