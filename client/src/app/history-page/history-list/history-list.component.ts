import {Component, Input, OnChanges, SimpleChanges} from '@angular/core'
import {Order} from '../../shared/interfaces'
import * as moment from 'moment'

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.css']
})
export class HistoryListComponent implements OnChanges {
  @Input() orders: Order[]
  viewOrders


  ngOnChanges({orders}: SimpleChanges) {
    this.viewOrders = this.mapOrdersView(orders.currentValue)
  }

  mapOrdersView(orders: Order[]) {
    return orders.map(order => {
      return {
        order: order.order,
        date: moment(order.date).format('DD.MM.YYYY'),
        time: moment(order.date).format('HH:mm:ss'),
        price: order.list.reduce((total, item) => {
          return total += item.quantity * item.cost
        }, 0)
      }
    })
  }

}
