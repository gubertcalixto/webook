import { Component, ElementRef, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OauthManagerService } from '@oath/services/oauth-manager.service';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { ContactFormService } from './contact-form.service';

@Component({
  selector: 'wb-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WelcomePageComponent implements OnDestroy {
  private subs: Subscription[] = [];
  public form: FormGroup;
  public searchValue: string;
  public currentSection = 'presentation';
  public contactFormSent: boolean;
  public isScrollOnTop = true;
  public isNavigationCompactModeEnabled = false;
  @ViewChild('backgroundVideo') private backgroundVideo: ElementRef<HTMLVideoElement>;

  @ViewChild('welcomeContentElement', { static: false, read: ElementRef }) private welcomeContentEl: ElementRef<HTMLElement>;

  constructor(
    public oAuthManagerService: OauthManagerService,
    private contactFormService: ContactFormService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.subs.push(this.oAuthManagerService.finishedLoadingSubject
      .pipe(switchMap(() => this.oAuthManagerService.hasValidToken()))
      .subscribe((res) => {
        if (res) {
          this.router.navigateByUrl('/home');
        }
      }));
    this.form = this.fb.group({
      userName: [undefined, [Validators.required, Validators.minLength(2)]],
      email: [undefined, [Validators.required, Validators.email, Validators.minLength(3)]],
      subject: [0, [Validators.required]],
      message: [undefined, [Validators.required, Validators.minLength(5), Validators.maxLength(500)]],
    })
  }

  ngAfterViewInit(): void {
    const setIsNavigationCompactModeEnabled = () => {
      this.isNavigationCompactModeEnabled = document.body.clientWidth <= 1000;
    };
    setTimeout(() => {
      setIsNavigationCompactModeEnabled();
      this.autoplayBackgroundVideo();
    });
    window.onresize = () => {
      setIsNavigationCompactModeEnabled();
    };
    this.welcomeContentEl.nativeElement.onscroll = () => {
      const isElementOnScreen = (elementid: string) => {
        const element = document.getElementById(elementid);
        if (!element) {
          return false;
        }
        const rect = element.getBoundingClientRect();
        return (
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
        );
      };
      this.isScrollOnTop = this.welcomeContentEl.nativeElement.scrollTop === 0;
      const presentationOnScreen = isElementOnScreen('presentation');
      const whatIsWebookOnScreen = isElementOnScreen('what-is-webook') || isElementOnScreen('features');
      const formOnScreen = isElementOnScreen('suggestion-or-question-form');
      if (formOnScreen) {
        this.currentSection = 'suggestion-or-question-form';
      } else if (whatIsWebookOnScreen) {
        this.currentSection = 'what-is-webook';
      } else if (presentationOnScreen || this.isScrollOnTop) {
        this.currentSection = 'presentation';
      } else {
        this.currentSection = undefined;
      }
    };
    if (this.isScrollOnTop) {
      this.currentSection = 'presentation';
    }
  }

  ngOnDestroy(): void {
    this.subs.forEach((s) => s.unsubscribe());
  }

  public login(): void {
    this.oAuthManagerService.login();
  }

  public search(): void {
    const url = !this.searchValue ? '/search' : `/search?query=${this.searchValue}`;
    this.router.navigateByUrl(url);
  }

  public goToSection(sectionId: string): void {
    const elementToScroll = document.getElementById(sectionId);
    if (!elementToScroll) {
      return;
    }
    elementToScroll.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }

  public sendForm(): void {
    const userName = this.form.get('userName').value;
    const email = this.form.get('email').value;
    const subject = this.form.get('subject').value;
    const message = this.form.get('message').value;
    this.subs.push(this.contactFormService.sendContactForm(userName, email, message, subject).subscribe(() => {
      this.contactFormSent = true;
    }));
  }

  private autoplayBackgroundVideo(): void {
    if (this.backgroundVideo?.nativeElement) {
      this.backgroundVideo.nativeElement.muted = true;
      this.backgroundVideo.nativeElement.play();
    }
  }
}
