import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'wb-filter-selection',
  templateUrl: './filter-selection.component.html',
  styleUrls: ['./filter-selection.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FilterSelectionComponent implements OnInit {
  public form: FormGroup;
  public isUpdating: boolean;
  public currentQuery: string;
  public currentFilter: {
    date: {
      start: string;
      end: string;
    };
    user: string;
    rate: string;
    tags: string[];
  };

  constructor(private fb: FormBuilder, private modalRef: NzModalRef) { }

  ngOnInit(): void {
    // TODO: Get Filter Status on Open Modal
    const isDateFilterEnabled = Boolean(this.currentFilter?.date?.start || this.currentFilter?.date?.end);
    const isRateFilterEnabled = Boolean(this.currentFilter?.rate);
    const isUserFilterEnabled = Boolean(this.currentFilter?.user);
    const isTagFilterEnabled = Boolean(this.currentFilter?.tags?.length);
    this.form = this.fb.group({
      isDateFilterEnabled: [isDateFilterEnabled],
      dateFilterStart: [{ value: this.currentFilter?.date?.start, disabled: !isDateFilterEnabled }],
      dateFilterEnd: [{ value: this.currentFilter?.date?.end, disabled: !isDateFilterEnabled }],
      isRateFilterEnabled: [isRateFilterEnabled],
      rateFilter: [{ value: this.currentFilter?.rate, disabled: !isRateFilterEnabled }],
      isUserFilterEnabled: [isUserFilterEnabled],
      userFilter: [{ value: this.currentFilter?.user, disabled: !isUserFilterEnabled }],
      isTagFilterEnabled: [isTagFilterEnabled],
      tagFilter: [{ value: this.currentFilter?.tags, disabled: !isTagFilterEnabled }],
      query: [this.currentQuery],
    });
  }

  public cancelModal(): void {
    this.modalRef.close();
  }

  public saveModal(): void {
    if (this.form.invalid || this.isUpdating) {
      return;
    }
    this.isUpdating = true;
    const result = {
      query: this.form.get('query').value,
      date: {
        start: this.form.get('isDateFilterEnabled').value ? this.form.get('dateFilterStart').value : undefined,
        end: this.form.get('isDateFilterEnabled').value ? this.form.get('dateFilterEnd').value : undefined
      },
      rate: this.form.get('isRateFilterEnabled').value ? this.form.get('rateFilter').value : undefined,
      user: this.form.get('isUserFilterEnabled').value ? this.form.get('userFilter').value : undefined,
      tags: this.form.get('isTagFilterEnabled').value ? this.form.get('tagFilter').value : undefined,
    };
    this.modalRef.close(result);
  }

  public clearFilters(): void {
    this.form.reset();
    this.form.markAsPristine();
  }

  public userFilterChanged(): void {
    if (this.form.get('isUserFilterEnabled').value) {
      this.form.get('userFilter').enable();
    } else {
      this.form.get('userFilter').disable();
    }
  }
}
