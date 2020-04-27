import {Component, HostBinding, Input, OnInit} from '@angular/core';

@Component({
  selector: 'book-cover',
  templateUrl: './example-notebook-cover.component.html',
  styleUrls: ['./example-notebook-cover.component.scss']
})
export class ExampleNotebookCoverComponent implements OnInit {
  @HostBinding('style.background-color') @Input() private backgroundColor = '#241F20';

  constructor() { }

  ngOnInit() {
  }

}
