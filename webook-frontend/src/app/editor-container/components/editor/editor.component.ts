import { Component, ElementRef, EventEmitter, HostBinding, Input, Output } from '@angular/core';

@Component({
  selector: 'wb-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent {
  @HostBinding('class.editing') @Input() public editMode: boolean;
  @Output() public editModeChange = new EventEmitter<boolean>();

  public get moveableTarget() {
    return this.elementRef?.nativeElement?.querySelectorAll(':scope > *');
  }

  public get elementHTML() { return this.elementRef?.nativeElement; }

  constructor(private elementRef: ElementRef<HTMLElement>) { }
}
