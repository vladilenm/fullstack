import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core'
import {MaterialService, IMaterialInstance} from '../shared/classes/material.service'
import * as moment from 'moment'
import {AnalyticsService} from '../shared/services/analytics.service'
import {Observable} from 'rxjs/Observable'
import {Overview} from '../shared/interfaces'

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.css']
})
export class OverviewPageComponent implements OnInit, AfterViewInit, OnDestroy {
  date: string
  tapTarget: IMaterialInstance

  @ViewChild('tapTarget') tapTargetEl: ElementRef

  data$: Observable<Overview>

  constructor(public analyticsService: AnalyticsService) {
  }

  ngOnInit() {
    this.date = moment().add(-1, 'd').format('DD.MM.YYYY')
    this.data$ = this.analyticsService.fetchOverview()
  }

  ngAfterViewInit() {
    this.tapTarget = MaterialService.tapTarget(this.tapTargetEl)
  }

  ngOnDestroy() {
    this.tapTarget.destroy()
  }

  showInfo() {
    this.tapTarget.open()
  }

}
