import {Directive, ViewContainerRef} from '@angular/core';

// tslint:disable-next-line:directive-selector
@Directive({ selector: '[editorItemContent]' })
export class TccEditorElementProjectionDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
