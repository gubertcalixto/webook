import {Component, HostBinding, ViewEncapsulation} from '@angular/core';
import {ShortcutEventOutput, ShortcutInput} from 'ng-keyboard-shortcuts';
import {pagesData} from '../example-notebook.data';
import {NotebookParts, NotebookStates} from './example-notebook.tokens';

const PAGE_ANIMATION_TIME = 750;

export class BookPage {
  message: string;
  color: string;
}

@Component({
  selector: 'notebook',
  templateUrl: './example-notebook.component.html',
  styleUrls: ['./example-notebook.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ExampleNotebookComponent {
  public pageBothSides: { left: BookPage; right: BookPage }[] = [];
  public currentState: NotebookStates = 'cover';
  public lastState: NotebookStates;
  public duringTransition = false;
  public pageIndex = -1;
  public onlyPageViewActivated = false;

  @HostBinding('class.opened') public isOpened: boolean;
  shortcuts: ShortcutInput[] = [
    {key: ['left'], command: (output: ShortcutEventOutput) => this.leftArrow(output)},
    {key: ['right'], command: (output: ShortcutEventOutput) => this.rightArrow(output)}
  ];

  constructor() {
    for (let index = 0; index < pagesData.length; index += 2) {
      this.pageBothSides.push({
        left: pagesData[index],
        right: pagesData[index + 1]
      });
    }
  }

  private leftArrow(output: ShortcutEventOutput): void {
    if (this.duringTransition) {
      return;
    }
    let to: NotebookStates;
    if (this.pageIndex <= 0) {
      to = 'back';
      this.isOpened = false;
    } else if (this.pageIndex === 1) {
      to = 'cover';
      this.isOpened = false;
    } else {
      to = 'page';
      this.isOpened = true;
    }
    this.changeState(to);
    this.pageIndex--;
    if (this.pageIndex < 0) {
      this.pageIndex = pagesData.length + 1;
    }
  }

  private rightArrow(output: ShortcutEventOutput): void {
    if (this.duringTransition) {
      return;
    }
    let to: NotebookStates;
    if (this.pageIndex === pagesData.length + 1) {
      to = 'cover';
      this.isOpened = false;
    } else if (this.pageIndex === pagesData.length) {
      to = 'back';
      this.isOpened = false;
    } else {
      to = 'page';
      this.isOpened = true;
    }
    this.changeState(to);
    if (this.pageIndex < 0) {
      this.pageIndex++;
    }
    this.pageIndex++;
    if (this.pageIndex > pagesData.length + 1) {
      this.pageIndex = 0;
    }
  }

  private changeState(to: NotebookParts) {
    this.lastState = this.currentState;
    this.currentState = to;
    this.duringTransition = true;
    setTimeout(() => {
      this.duringTransition = false;
    }, PAGE_ANIMATION_TIME);
  }

}
