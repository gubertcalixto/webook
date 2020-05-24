import { AfterContentInit, Component, ComponentFactoryResolver, Input, OnDestroy, ViewChild } from '@angular/core';
import { WebookEditorBaseElement } from '@webook-editor-base/webook-editor-base-element';
import { WebookEditorElement } from '@webook-editor-base/webook-editor-element';
import { Subscription } from 'rxjs';

import { WebookEditorElementProjectionDirective } from './webook-editor-element-projection.directive';

@Component({
  selector: 'wb-editor-element-projection',
  templateUrl: './webook-editor-element-projection.component.html',
  styleUrls: ['./webook-editor-element-projection.component.scss']
})
export class WebookEditorElementProjectionComponent implements AfterContentInit, OnDestroy {
  private subs: Subscription[] = [];
  @Input() public item: WebookEditorElement;

  @ViewChild(WebookEditorElementProjectionDirective, { static: true }) workflowHost: WebookEditorElementProjectionDirective;
  private currentComponentInstance: WebookEditorBaseElement;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngAfterContentInit(): void {
    this.instantiateComponent();
  }

  ngOnDestroy(): void {
    this.clearComponentInstance();
    this.subs.filter(s => Boolean(s)).forEach(s => s.unsubscribe());
  }

  public instantiateComponent() {
    this.clearComponentInstance();
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.item.component);
    try {
      const componentRef = this.workflowHost.viewContainerRef.createComponent(componentFactory);
      this.currentComponentInstance = componentRef.instance;
    } catch (error) {
      // console.warn(`It seems that component ${this.item.id || this.item.title} couldn't be instantiated`);
      // this.emitWorkflowEvent();
    }
    this.startCommunicateToInstantiatedComponent();
  }

  private startCommunicateToInstantiatedComponent() {
    // this.currentComponentInstance.itemInput = this.itemInput;
    // this.currentComponentInstance.itemData = this.itemData;
    // this.subs.push(this.currentComponentInstance.workflowEventEmitter.subscribe((event: WorkflowOutputEvent) => {
    //   this.processWorkflowEvent(event);
    // }));
  }

  // public emitWorkflowEvent(eventType: WorkflowComponentEvents = WorkflowComponentEvents.Cancel) {
  //   const event = new WorkflowOutputEvent({
  //     eventType,
  //     output: this.currentComponentInstance ? this.currentComponentInstance.itemOutput : undefined,
  //     itemData: this.currentComponentInstance ? this.currentComponentInstance.itemData : undefined
  //   });
  //   this.processWorkflowEvent(event);
  // }

  // private processWorkflowEvent(event: WorkflowOutputEvent): void {
  //   switch (event.eventType) {
  //     case WorkflowComponentEvents.Reopen:
  //       this.instantiateComponent();
  //       break;
  //     case WorkflowComponentEvents.Save:
  //     case WorkflowComponentEvents.Cancel:
  //     default:
  //       this.contentAction.emit(event);
  //       break;
  //   }
  // }

  private clearComponentInstance() {
    this.workflowHost.viewContainerRef.clear();
    this.currentComponentInstance = undefined;
  }
}
