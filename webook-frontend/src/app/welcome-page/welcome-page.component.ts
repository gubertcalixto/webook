import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
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
  contactFormSend: boolean;

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

  public sendForm(): void {
    const userName = this.form.get('userName').value;
    const email = this.form.get('email').value;
    const subject = this.form.get('subject').value;
    const message = this.form.get('message').value;
    this.subs.push(this.contactFormService.sendContactForm(userName, email, message, subject).subscribe(() => {
      this.contactFormSend = true;
    }));
  }
}
