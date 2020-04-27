import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ExampleNotebookPageComponent} from './example-notebook-page/example-notebook-page.component';
import {ExampleNotebookCoverComponent} from './example-notebook-cover/example-notebook-cover.component';
import {ExampleNotebookComponent} from './example-notebook/example-notebook.component';
import {ExampleNotebookMarkerComponent} from './example-notebook-marker/example-notebook-marker.component';
import { ExampleNotebookBackComponent } from './example-notebook-back/example-notebook-back.component';
import {NzButtonModule} from 'ng-zorro-antd';
import {KeyboardShortcutsModule} from 'ng-keyboard-shortcuts';

@NgModule({
  declarations: [ExampleNotebookComponent, ExampleNotebookPageComponent, ExampleNotebookCoverComponent, ExampleNotebookMarkerComponent, ExampleNotebookBackComponent],
  imports: [
    CommonModule,
    NzButtonModule,
    KeyboardShortcutsModule
  ],
  exports: [ExampleNotebookComponent, ExampleNotebookPageComponent, ExampleNotebookCoverComponent, ExampleNotebookMarkerComponent],
})
export class ExampleNotebookModule {
}
