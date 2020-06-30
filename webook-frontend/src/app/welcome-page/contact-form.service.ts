import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ContactFormServiceProxy, ContactFormSubjectType } from '../client/webook';

@Injectable()
export class ContactFormService {

  constructor(private contactFormServiceProxy: ContactFormServiceProxy) { }

  public sendContactForm(name: string, email: string, body: string, subjectType?: ContactFormSubjectType): Observable<void> {
    return this.contactFormServiceProxy.contactFormPost(name, email, body, subjectType);
  }
}
