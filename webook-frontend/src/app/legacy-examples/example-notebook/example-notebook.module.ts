import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { KeyboardShortcutsModule } from 'ng-keyboard-shortcuts';
import { NzButtonModule } from 'ng-zorro-antd/button';

import { ExampleNotebookBackComponent } from './example-notebook-back/example-notebook-back.component';
import { ExampleNotebookCoverComponent } from './example-notebook-cover/example-notebook-cover.component';
import { ExampleNotebookMarkerComponent } from './example-notebook-marker/example-notebook-marker.component';
import { ExampleNotebookPageComponent } from './example-notebook-page/example-notebook-page.component';
import { ExampleNotebookComponent } from './example-notebook/example-notebook.component';

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
