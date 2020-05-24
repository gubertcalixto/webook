import { Directive, ViewContainerRef } from '@angular/core';

// tslint:disable-next-line:directive-selector
@Directive({ selector: '[editorItemContent]' })
export class WebookEditorElementProjectionDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
