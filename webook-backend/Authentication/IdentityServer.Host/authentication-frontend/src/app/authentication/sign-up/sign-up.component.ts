import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { v4 as UUID } from 'uuid';

import { RegisterOutputResult } from '../client';
import { AuthenticationService } from '../services/authentication.service';
import { ExternalAuthenticationService } from '../services/external-authentication.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SignUpComponent implements OnInit, OnDestroy {
  private subs: Subscription[] = [];
  public form: FormGroup;
  public passwordVisible: boolean;
  public loginAlreadyExists: boolean;
  public registerFailed: boolean;
  public emailAlreadyExists: boolean;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private externalAuthenticationService: ExternalAuthenticationService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email, Validators.minLength(3)]],
      login: [null, [Validators.required, Validators.minLength(4)]],
      password: [null, [Validators.required, Validators.minLength(4)]]
    });
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  public onAuthSocialMediaSelected(socialMedia: string): void {
    switch (socialMedia) {
      case 'facebook':
        // TODO: Create Account with facebook
        console.log('TODO: Create Account with facebook');
        break;
      case 'google':
        this.externalAuthenticationService.loginWithGoogle();
        break;
      case 'twitter':
        // TODO: Login with twitter
        console.log('TODO: Create Account with twitter');
        break;
    }
  }

  public submitForm(): void {
    if (this.form.pristine || this.form.invalid) {
      return;
    }
    this.registerFailed = false;
    this.loginAlreadyExists = false;
    this.emailAlreadyExists = false;

    const id = UUID();
    const login = this.form.get('login').value;
    const firstName = this.form.get('firstName').value;
    const lastName = this.form.get('lastName').value;
    const email = this.form.get('email').value;
    const password = this.form.get('password').value;
    this.subs.push(
      this.authenticationService.signUp(id, login, firstName, lastName, email, password)
        .subscribe(res => {
          switch (res.result) {
            case RegisterOutputResult.Success:
              this.redirectToSignIn();
              break;
            case RegisterOutputResult.LoginConflict:
              this.loginAlreadyExists = true;
              this.form.markAsPristine();
              break;
            case RegisterOutputResult.EmailConflict:
              this.emailAlreadyExists = true;
              this.form.markAsPristine();
              break;
            case RegisterOutputResult.Failed:
            default:
              this.registerFailed = true;
              break;
          }
        }, () => this.registerFailed = true)
    );
  }

  public redirectToSignIn(): void {
    this.router.navigateByUrl('/sign-in');
  }
}
