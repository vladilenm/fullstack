import {Component, Input} from '@angular/core'
import {Observable} from 'rxjs/Observable'

@Component({
  selector: 'app-pending-view',
  templateUrl: './pending-view.component.html',
  styleUrls: ['./pending-view.component.css']
})
export class PendingViewComponent {
  @Input('observer') observer$: Observable<any>
  @Input() emptyText = 'Здесь пока ничего нет'
}
