import {Component, HostBinding, Input, OnInit} from '@angular/core';

@Component({
  selector: 'book-page',
  templateUrl: './example-notebook-page.component.html',
  styleUrls: ['./example-notebook-page.component.scss']
})
export class ExampleNotebookPageComponent implements OnInit {
  @HostBinding('style.background-color') @Input() private backgroundColor = '#cacaca';

  constructor() { }

  ngOnInit() {
  }

}
