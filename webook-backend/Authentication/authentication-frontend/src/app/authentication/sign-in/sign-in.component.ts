import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SignInComponent implements OnInit {
  form: FormGroup;
  passwordVisible: boolean;

  constructor(private fb: FormBuilder, private router: Router) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
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
    // TODO: forgotPassword
    console.log('forgotPassword called');
  }

  public submitForm(): void {
    if (this.form.pristine || this.form.invalid) {
      return;
    }
    // TODO: submitForm
    console.log('submitForm called');
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
