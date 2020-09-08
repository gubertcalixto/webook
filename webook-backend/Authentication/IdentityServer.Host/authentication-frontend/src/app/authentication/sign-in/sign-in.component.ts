import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { urlConsts } from 'src/environments/url.consts';

import { LogInStatus } from '../client';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SignInComponent implements OnInit, OnDestroy {
  private subs: Subscription[] = [];
  public form: FormGroup;
  public passwordVisible: boolean;
  public errorDuringLogin: boolean;
  public loginFailed: boolean;
  public userInactive: boolean;
  public userBlocked: boolean;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authenticationService: AuthenticationService
  ) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      redirectUrl: [undefined, [Validators.nullValidator]]
    });
    this.subs.push(this.activatedRoute.queryParams.subscribe(params => {
      if (params.returnUrl) {
        this.form.get('redirectUrl').setValue(params.returnUrl);
      }
    }));
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  public loginOutside(socialMedia: 'google' | 'facebook' | 'twitter') {
    switch (socialMedia) {
      case 'facebook':
        // TODO: Login with facebook
        console.log('TODO: Login with facebook');
        break;
      case 'google':
        // TODO: Login with google
        console.log('TODO: Login with google');
        break;
      case 'twitter':
        // TODO: Login with twitter
        console.log('TODO: Login with twitter');
        break;
    }
  }

  public forgotPassword(): void {
    this.router.navigateByUrl('/forgot-password');
  }

  public submitForm(): void {
    if (this.form.pristine || this.form.invalid) {
      return;
    }

    this.errorDuringLogin = false;
    this.userInactive = false;
    this.loginFailed = false;
    this.userBlocked = false;

    const login = this.form.get('userName').value;
    const password = this.form.get('password').value;
    const redirectUrl = this.form.get('redirectUrl').value;

    this.subs.push(this.authenticationService.signIn(login, password, redirectUrl).subscribe(res => {
      switch (res.loginResult) {
        case LogInStatus.IncorrectUserOrPassword:
          this.loginFailed = true;
          break;
        case LogInStatus.UserInactive:
          this.userInactive = true;
          break;
        case LogInStatus.UserBlocked:
          this.userBlocked = true;
          break;
        case LogInStatus.Validated:
          window.location.href = redirectUrl ?
            `${urlConsts.authServerUrl()}/${String(redirectUrl).substring(1)}` :
            urlConsts.defaultRedirectUrl();
          break;
        case LogInStatus.UnknownError:
        default:
          this.errorDuringLogin = true;
          break;
      }
    }, () => {
      this.errorDuringLogin = true;
    }));
  }

  public redirectToCreateAccount(): void {
    this.router.navigateByUrl('/sign-up');
  }

  public onAuthSocialMediaSelected(socialMedia: string): void {
    switch (socialMedia) {
      case 'facebook':
        // TODO: Login with facebook
        console.log('TODO: Login with facebook');
        break;
      case 'google':
        // TODO: Login with google
        console.log('TODO: Login with google');
        break;
      case 'twitter':
        // TODO: Login with twitter
        console.log('TODO: Login with twitter');
        break;
    }
  }
}
