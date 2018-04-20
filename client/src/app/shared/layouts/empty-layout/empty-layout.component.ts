import {Component, OnInit, ViewEncapsulation} from '@angular/core'

@Component({
  selector: 'app-empty-layout',
  templateUrl: './empty-layout.component.html',
  styleUrls: ['./empty-layout.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EmptyLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
