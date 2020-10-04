import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { DenounceDocumentServiceProxy } from '../../../client/webook/api/denounceDocumentServiceProxy';
import { DenounceInput } from '../../../client/webook/model/models';

@Injectable()
export class DenounceService {

  constructor(private denounceDocumentServiceProxy: DenounceDocumentServiceProxy) { }

  public denounce(denounceInput: DenounceInput): Observable<any> {
    return this.denounceDocumentServiceProxy.documentIdDenouncePost(denounceInput.documentId, denounceInput);
  }
}
