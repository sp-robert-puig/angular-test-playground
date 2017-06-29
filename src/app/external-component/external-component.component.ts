import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-external-component',
  templateUrl: './external-component.component.html',
  styleUrls: ['./external-component.component.css']
})
export class ExternalComponent implements OnInit {
  title = 'external component!';
  constructor() { }
  // test
  ngOnInit() {

  }
}
