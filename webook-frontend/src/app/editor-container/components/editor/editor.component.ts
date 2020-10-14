import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { SelectoEvents } from 'selecto';

import { EditorDocumentPageInstanceService } from '../../services/document-page-instance.service';

@Component({
  selector: 'wb-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditorComponent implements AfterViewInit, OnDestroy {
  private _selectedElementIds: string[] = [];
  private subs: Subscription[] = [];
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

  constructor(
    private editorDocumentPageInstanceService: EditorDocumentPageInstanceService,
    public elementRef: ElementRef<HTMLElement>) { }

  ngAfterViewInit(): void {
    this.subscribeToPageDataChange();
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  private subscribeToPageDataChange(): void {
    this.subs.push(this.editorDocumentPageInstanceService.dataChanged.subscribe(data => {
      if (data?.backgroundImage) {
        this.elementRef.nativeElement.style.background = data.backgroundImage;
      } else if (data?.backgroundColor) {
        this.elementRef.nativeElement.style.background = data.backgroundColor;
      } else {
        this.elementRef.nativeElement.style.background = 'unset';
      }
    }))
  }

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
