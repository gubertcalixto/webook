import {Component, HostBinding, Input, OnInit} from '@angular/core';

@Component({
  selector: 'book-back',
  templateUrl: './example-notebook-back.component.html',
  styleUrls: ['./example-notebook-back.component.scss']
})
export class ExampleNotebookBackComponent implements OnInit {
  @HostBinding('style.background-color') @Input() private backgroundColor = '#241F20';

  constructor() { }

  ngOnInit() {
  }

}
