import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs/Observable'
import {Analytics, Overview} from '../interfaces'

@Injectable()
export class AnalyticsService {
  constructor(private http: HttpClient) {}

  fetchOverview(): Observable<Overview> {
    return this.http.get<Overview>('/api/analytics/overview')
  }

  fetchAnalytics(): Observable<Analytics> {
    return this.http.get<Analytics>('/api/analytics/analytics')
  }
}
