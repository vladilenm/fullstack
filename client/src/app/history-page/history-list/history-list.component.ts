import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewChild
} from '@angular/core'
import {Order} from '../../shared/interfaces'
import * as moment from 'moment'
import {IMaterialInstance, MaterialService} from '../../shared/classes/material.service'

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.css']
})
export class HistoryListComponent implements OnChanges, AfterViewInit, OnDestroy {
  @Input() orders: Order[]
  @ViewChild('modal') modalRef: ElementRef

  modal: IMaterialInstance
  viewOrders: any[]

  selectedOrder: Order

  ngOnChanges({orders}: SimpleChanges) {
    this.viewOrders = this.mapOrdersView(orders.currentValue)
  }

  mapOrdersView(orders: Order[]) {
    return orders.map(order => {
      return {
        order: order.order,
        date: moment(order.date).format('DD.MM.YYYY'),
        time: moment(order.date).format('HH:mm:ss'),
        price: this.calculatePrice(order),
        id: order._id
      }
    })
  }

  calculatePrice(order: Order): number {
    return order.list.reduce((total, item) => {
      return total += item.quantity * item.cost
    }, 0)
  }

  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef)
  }

  ngOnDestroy() {
    this.modal.destroy()
  }

  showOrderList(orderId: string) {
    this.selectedOrder = this.orders.find(order => order._id === orderId)
    this.modal.open()
  }

  closeListModal() {
    this.modal.close()
  }

}
