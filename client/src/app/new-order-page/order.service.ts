import {Injectable} from '@angular/core'
import {OrderListItem} from '../shared/interfaces'

@Injectable()
export class OrderService {
  public list: OrderListItem[] = []
  public price = 0

  add(item: OrderListItem) {
    const possible = this.list.find(i => i._id === item._id)
    if (possible) {
      possible.quantity += item.quantity
    } else {
      this.list.push(item)
    }
    this.computePrice()
  }

  remove(id: string) {
    const idx = this.list.findIndex(i => i._id === id)
    this.list.splice(idx, 1)
    this.computePrice()
  }

  clear() {
    this.list = []
    this.price = 0
  }

  private computePrice() {
    this.price = this.list.reduce((total, item) => {
      return total += item.quantity * item.cost
    }, 0)
  }

}
