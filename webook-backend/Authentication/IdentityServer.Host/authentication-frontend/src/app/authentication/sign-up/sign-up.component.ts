import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SignUpComponent implements OnInit {
  form: FormGroup;
  passwordVisible: boolean;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email, Validators.minLength(3)]],
      password: [null, [Validators.required]]
    });
  }

  public onAuthSocialMediaSelected(socialMedia: string): void {
    switch (socialMedia) {
      case 'facebook':
        // TODO: Create Account with facebook
        console.log('TODO: Create Account with facebook');
        break;
      case 'google':
        // TODO: Login with google
        console.log('TODO: Create Account with google');
        break;
      case 'twitter':
        // TODO: Login with twitter
        console.log('TODO: Create Account with twitter');
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

  public redirectToSignIn(): void {
    this.router.navigateByUrl('/sign-in');
  }
}
