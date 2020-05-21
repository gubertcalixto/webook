import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-example-editor',
  templateUrl: './example-editor.component.html',
  styleUrls: ['./example-editor.component.scss']
})
export class ExampleEditorComponent implements OnInit {
  public documentTitle = 'Document 1';
  public pageSelectionOpen = false;
  public pageSelectionExpanded = false;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public redirectBack(): void {
    console.log('backToStart');
    // this.router.navigateByUrl('/');
  }
}
