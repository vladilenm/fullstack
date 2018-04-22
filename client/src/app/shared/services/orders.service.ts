import {Injectable} from '@angular/core'
import {Observable} from 'rxjs/Observable'
import {HttpClient, HttpParams} from '@angular/common/http'
import {Order} from '../interfaces'

@Injectable()
export class OrdersService {
  constructor(private http: HttpClient) {}

  create(order: Order): Observable<Order> {
    return this.http.post<Order>('/api/order', order)
  }

  fetch(params: any = {}): Observable<Order[]> {
    return this.http.get<Order[]>(`/api/order`, {
      params: new HttpParams({fromObject: params})
    })
  }
}
