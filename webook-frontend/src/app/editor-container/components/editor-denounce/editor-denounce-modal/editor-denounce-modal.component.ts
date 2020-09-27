import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { first } from 'rxjs/operators';
import { DenounceInput } from 'src/app/client/webook';

import { DenounceService } from '../denounce.service';

@Component({
  selector: 'wb-editor-denounce-modal',
  templateUrl: './editor-denounce-modal.component.html',
  styleUrls: ['./editor-denounce-modal.component.scss']
})
export class EditorDenounceModalComponent implements OnInit {
  @Input() public documentId: string;
  public formGroup: FormGroup;

  constructor(
    private modalRef: NzModalRef,
    private denounceService: DenounceService,
    fb: FormBuilder,
  ) {
    this.formGroup = fb.group({
      motivation: [undefined, [Validators.required]],
      message: ['', [Validators.maxLength(255)]],
    });
  }

  ngOnInit(): void {
    if (!this.documentId) {
      this.close(false);
    }
  }

  public denounce(): void {
    if (this.formGroup.invalid) {
      return;
    }
    const input: DenounceInput = {
      documentId: this.documentId,
      description: this.formGroup.get('message').value,
      denounceMotivation: this.formGroup.get('motivation').value,
    };
    this.denounceService.denounce(input)
      .pipe(first())
      .subscribe(() => {
        this.close(true);
      });
  }

  public close(data = false): void {
    this.modalRef.close(data);
  }
}
