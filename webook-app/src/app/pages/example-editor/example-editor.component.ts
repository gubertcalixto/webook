import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-example-editor',
  templateUrl: './example-editor.component.html',
  styleUrls: ['./example-editor.component.scss']
})
export class ExampleEditorComponent {
  public documentTitle = 'Document 1';
  public pageSelectionOpen = false;
  public pageIndex = 1;
  public pageTotalCount = 5;
  public pageSelectionExpanded = true;

  constructor(private router: Router) { }

  public redirectBack(): void {
    console.log('backToStart');
    // this.router.navigateByUrl('/');
  }
}
