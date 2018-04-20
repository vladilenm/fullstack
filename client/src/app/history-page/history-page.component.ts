import {Component, OnInit} from '@angular/core'
import {OrdersService} from '../shared/services/orders.service'
import {Observable} from 'rxjs/Observable'
import {Order} from '../shared/interfaces'
import {Filter} from './history-filter/history-filter.component'

const STEP = 2
const LIMIT = 2

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.css']
})
export class HistoryPageComponent implements OnInit {

  orders: Order[] = []

  filterVisible = false
  reloading = false
  loading = false
  noMore = false

  limit = LIMIT
  offset = 0

  filter: Filter = {}

  constructor(private ordersService: OrdersService) {
  }

  ngOnInit() {
    this.reloading = true
    this.fetch()
  }

  updateList(orders: Order[]) {
    this.orders = this.orders.concat(orders)
    this.noMore = orders.length < STEP
    this.loading = false
    this.reloading = false
  }

  private fetch() {
    const params = Object.assign({}, this.filter, {
      limit: this.limit,
      offset: this.offset
    })
    this.ordersService.fetch(params).subscribe(this.updateList.bind(this))
  }

  loadMore() {
    this.offset += STEP
    this.loading = true
    this.fetch()
  }

  applyFilter(filter: Filter) {
    this.orders = []
    this.limit = LIMIT
    this.offset = 0
    this.filter = filter
    this.reloading = true
    this.fetch()
  }

  isFiltered(): boolean {
    return Object.keys(this.filter).length !== 0
  }

}
