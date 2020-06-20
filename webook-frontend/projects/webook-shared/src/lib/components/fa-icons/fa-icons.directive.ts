import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[fa]'
})
export class FaIconsDirective {
  private internalFaStyle: 'fas' | 'fab' = 'fas';
  private internalFa: string;
  private internalFaSize: string;
  private internalClassAttribute: string;

  @Input('fa') get fa(): string { return this.internalFa; }
  set fa(value: string) {
    this.internalFa = (value && value.startsWith('fa-')) ? value : 'fa-' + value;
    this.getFinalClass();
  }

  @Input('faStyle') get faStyle(): 'fas' | 'fab' { return this.internalFaStyle; }
  set faStyle(value: 'fas' | 'fab') {
    this.internalFaStyle = value || 'fas';
    this.getFinalClass();
  }

  @HostBinding('style.color') @Input() public color: string;

  @Input('faSize') get faSize(): string { return this.internalFaSize; }
  set faSize(value: string) {
    this.internalFaSize = `fa-${value || '1'}x`;
    this.getFinalClass();
  }

  @Input('class') get classAttribute(): string { return this.internalClassAttribute; }
  set classAttribute(value: string) {
    this.internalClassAttribute = value;
    this.getFinalClass();
  }

  @HostBinding('class') public internalClass: string;

  private getFinalClass(): void {
    if (!this.fa) {
      return;
    }
    this.internalClass =
      (this.classAttribute ? this.classAttribute.trim() + ' ' : '') +
      this.faStyle.trim() + ' ' +
      this.fa.trim() +
      (this.faSize ? ' ' + this.faSize.trim() : '');

  }
}
