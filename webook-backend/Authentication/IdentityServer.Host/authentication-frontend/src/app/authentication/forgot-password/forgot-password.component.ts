import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Subscription } from 'rxjs';
import { validate as uuidValidate } from 'uuid';

import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  private subs: Subscription[] = [];
  public requestResetForm: FormGroup;
  public updatePasswordForm: FormGroup;
  public passwordVisible: boolean;
  public returnedForgotHash: string;

  public get isDuringUpdatePasswordProcess(): boolean {
    return Boolean(this.returnedForgotHash);
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private modal: NzModalService
  ) { }

  ngOnInit(): void {
    this.subs.push(this.activatedRoute.params.subscribe((params) => {
      if (params.forgotPasswordHash) {
        // Validate if hash is in correct format
        if (!uuidValidate(params.forgotPasswordHash)) {
          this.redirectToSignIn();
          return;
        }
        // Validate if hash exists
        this.authenticationService.doesForgotPasswordInfoExists(params.forgotPasswordHash).subscribe(doesExists => {
          if (!doesExists) {
            this.redirectToSignIn();
            return;
          }
          this.updatePasswordForm = this.fb.group({
            password: ['', [Validators.required, Validators.minLength(4)]],
          });
          this.returnedForgotHash = params.forgotPasswordHash;
        });
      } else {
        this.requestResetForm = this.fb.group({
          email: ['', [Validators.required, Validators.email]]
        });
      }
    }));
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  public submitRequestResetForm(): void {
    const email = this.requestResetForm.get('email').value;
    this.subs.push(this.authenticationService.requestForgotPassord(email)
      .subscribe(hasEmailBeenSent => {
        if (hasEmailBeenSent) {
          this.modal.success({
            nzTitle: 'Email Enviado',
            nzContent: 'Acabamos de enviar um email para você com um link para recuperar sua senha'
          });
        } else {
          this.modal.error({
            nzTitle: 'Email não enviado',
            nzContent: 'Não conseguimos te enviar um email, mas não se preocupe, você pode tentar depois'
          });
        }
      }));
  }

  public submitUpdateForm(): void {
    const password = this.updatePasswordForm.get('password').value;

    this.subs.push(this.authenticationService.requestUpdateForgottenPassword(this.returnedForgotHash, password).subscribe(() => {
      this.router.navigateByUrl('/sign-in');
    }));
  }

  public redirectToSignIn(): void {
    this.router.navigateByUrl('/sign-in');
  }
}
