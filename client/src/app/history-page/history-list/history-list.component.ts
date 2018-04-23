import {AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild} from '@angular/core'
import {Order} from '../../shared/interfaces'
import {IMaterialInstance, MaterialService} from '../../shared/classes/material.service'
import * as moment from 'moment'

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.css']
})
export class HistoryListComponent implements AfterViewInit, OnDestroy {
  @Input() orders: Order[]
  @ViewChild('modal') modalRef: ElementRef

  modal: IMaterialInstance
  selectedOrder: Order

  calculatePrice(order: Order): number {
    return order.list.reduce((total, item) => {
      return total += item.quantity * item.cost
    }, 0)
  }

  getOrderTime(order: Order): string {
    return moment(order.date).format('HH:mm:ss')
  }

  getOrderDate(order: Order): string {
    return moment(order.date).format('DD.MM.YYYY')
  }

  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef)
  }

  ngOnDestroy() {
    this.modal.destroy()
  }

  showOrderList(order: Order) {
    this.selectedOrder = order
    this.modal.open()
  }

  closeListModal() {
    this.modal.close()
  }

}
