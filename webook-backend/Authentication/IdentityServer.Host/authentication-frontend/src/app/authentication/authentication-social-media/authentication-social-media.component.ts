import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-authentication-social-media',
  templateUrl: './authentication-social-media.component.html',
  styleUrls: ['./authentication-social-media.component.scss']
})
export class AuthenticationSocialMediaComponent {
  public readonly socialMedia = [
    {
      name: 'google',
      icon: 'google',
      tooltip: 'Entrar com o Google',
      color: '#DC4E41'
    },
    {
      name: 'facebook',
      icon: 'facebook-f',
      tooltip: 'Entrar com o Facebook',
      color: '#4064AD'
    },
    {
      name: 'twitter',
      icon: 'twitter',
      tooltip: 'Entrar com o Twitter',
      color: '#20CCFE'
    },
  ];
  @Output() private authSocialMediaSelected = new EventEmitter<string>();

  public loginOutside(name: string): void {
    this.authSocialMediaSelected.emit(name);
  }
}
