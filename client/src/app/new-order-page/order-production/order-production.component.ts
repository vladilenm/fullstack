import {Component, OnInit} from '@angular/core'
import {PositionsService} from '../../shared/services/positions.service'
import {Observable} from 'rxjs/Observable'
import {OrderListItem, Position} from '../../shared/interfaces'
import {ActivatedRoute, Params} from '@angular/router'
import {switchMap, map} from 'rxjs/operators'
import {OrderService} from '../order.service'
import {MaterialService} from '../../shared/classes/material.service'

@Component({
  selector: 'app-order-production',
  templateUrl: './order-production.component.html',
  styleUrls: ['./order-production.component.css']
})
export class OrderProductionComponent implements OnInit {

  items$: Observable<OrderListItem[]>

  constructor(private positionsService: PositionsService,
              private route: ActivatedRoute,
              public order: OrderService) {
  }

  ngOnInit() {
    this.items$ = this.route.params
      .pipe(
        switchMap((params: Params) => {
          return this.positionsService.fetch(params['id'])
        }),
        map((positions: Position[]) => {
          return positions.map(position => {
            return {
              name: position.name,
              cost: position.cost,
              _id: position._id,
              quantity: 1
            }
          })
        })
      )
  }

  add(item: OrderListItem) {
    this.order.add(Object.assign({}, item))
    MaterialService.toast(`Добавлено x${item.quantity}`)
  }
}
