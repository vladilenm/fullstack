import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core'
import {OrdersService} from '../shared/services/orders.service'
import {Order} from '../shared/interfaces'
import {Filter} from './history-filter/history-filter.component'
import {Subscription} from 'rxjs/Subscription'
import {IMaterialInstance, MaterialService} from '../shared/classes/material.service'

const STEP = 2
const LIMIT = 2

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.css']
})
export class HistoryPageComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('tooltip') tooltipRef: ElementRef
  tooltip: IMaterialInstance

  orders: Order[] = []

  filterVisible = false
  reloading = false
  loading = false
  noMore = false

  limit = LIMIT
  offset = 0

  filter: Filter = {}
  oSub: Subscription

  constructor(private ordersService: OrdersService) {
  }

  ngOnInit() {
    this.reloading = true
    this.fetch()
  }

  ngOnDestroy() {
    this.oSub.unsubscribe()
    this.tooltip.destroy()
  }

  ngAfterViewInit() {
    this.tooltip = MaterialService.initTooltip(this.tooltipRef)
  }

  private fetch() {
    const params = Object.assign({}, this.filter, {
      limit: this.limit,
      offset: this.offset
    })
    this.oSub = this.ordersService.fetch(params).subscribe((orders: Order[]) => {
      this.orders = this.orders.concat(orders)
      this.noMore = orders.length < STEP
      this.loading = false
      this.reloading = false
    })
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
