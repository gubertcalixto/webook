import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SelectoEvents } from 'selecto';

@Component({
  selector: 'wb-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditorComponent {
  private _selectedElementIds: string[] = [];
  public isFocused = false;

  @HostBinding('class.editing') @Input() public editMode: boolean;
  @HostBinding('attr.tabindex') public tabindex = 0;
  @Input() public visualizeMode = false;
  @Output() public editModeChange = new EventEmitter<boolean>();

  @HostListener('focus') public onFocus() { this.isFocused = true; }
  @HostListener('blur') public onBlur() { this.isFocused = false; }

  public temporarySelectedElementIds: string[] = [];
  public get selectedElementIds(): string[] { return this._selectedElementIds; }
  public set selectedElementIds(value: string[]) {
    this._selectedElementIds = value;
    this.selectedElementIdsSubject.next(this._selectedElementIds);
  }
  public selectedElementIdsSubject = new BehaviorSubject<string[]>([]);
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
    if (this.visualizeMode) { return; }
    // TODO Drag Group
  }

  public onSelectStart(event: SelectoEvents['selectStart']): void {
    if (this.visualizeMode) { return; }
    this.isSelecting = true;
  }

  public onSelect(event: SelectoEvents['select']): void {
    if (this.visualizeMode) { return; }
    const selectedIds = event.selected.map(x => x.id);
    this.temporarySelectedElementIds = selectedIds;
  }

  public onSelectEnd(event: SelectoEvents['selectEnd']): void {
    if (this.visualizeMode) { return; }
    const selectedIds = event.selected.map(x => x.id);
    this.selectedElementIds = selectedIds;
    this.temporarySelectedElementIds.splice(0);
    this.isSelecting = false;
  }
}
