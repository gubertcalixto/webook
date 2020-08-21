import { Component, ElementRef, EventEmitter, HostBinding, Input, Output, ViewEncapsulation } from '@angular/core';
import { SelectoEvents } from 'selecto';

@Component({
  selector: 'wb-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditorComponent {
  @HostBinding('class.editing') @Input() public editMode: boolean;
  @Input() public readonlyMode = false;
  @Output() public editModeChange = new EventEmitter<boolean>();
  public temporarySelectedElementIds: string[] = [];
  public selectedElementIds: string[] = [];
  public isSelecting = false;

  public get moveableTarget() {
    return this.elementRef?.nativeElement?.querySelectorAll(':scope > *');
  }

  public get elementHTML() { return this.elementRef?.nativeElement; }
  public get currentSelectedElementIds() {
    return this.temporarySelectedElementIds.length
      ? this.temporarySelectedElementIds
      : this.selectedElementIds;
  }

  constructor(public elementRef: ElementRef<HTMLElement>) { }

  public onDragStart(event: SelectoEvents['drag']): void {
    if (this.readonlyMode) { return; }
    // TODO Drag Group
  }

  public onSelectStart(event: SelectoEvents['selectStart']): void {
    if (this.readonlyMode) { return; }
    this.isSelecting = true;
  }

  public onSelect(event: SelectoEvents['select']): void {
    if (this.readonlyMode) { return; }
    const selectedIds = event.selected.map(x => x.id);
    this.temporarySelectedElementIds = selectedIds;
  }

  public onSelectEnd(event: SelectoEvents['selectEnd']): void {
    if (this.readonlyMode) { return; }
    const selectedIds = event.selected.map(x => x.id);
    this.selectedElementIds = selectedIds;
    this.temporarySelectedElementIds.splice(0);
    this.isSelecting = false;
  }
}
