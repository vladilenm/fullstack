import {AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, Output, ViewChild} from '@angular/core'
import {IMaterialDatepicker, MaterialService} from '../../shared/classes/material.service'
import * as moment from 'moment'

export interface Filter {
  start?: Date
  end?: Date
  order?: number
}

@Component({
  selector: 'app-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.css']
})
export class HistoryFilterComponent implements AfterViewInit, OnDestroy {

  @ViewChild('dtStart') dtStartRef: ElementRef
  @ViewChild('dtEnd') dtEndRef: ElementRef

  @Output() onFilter = new EventEmitter<Filter>()

  start: IMaterialDatepicker
  end: IMaterialDatepicker

  orderNumber

  valid = true

  ngAfterViewInit() {
    this.start = MaterialService.initDatepicker(this.dtStartRef, this.validateDate.bind(this))
    this.end = MaterialService.initDatepicker(this.dtEndRef, this.validateDate.bind(this))
  }

  validateDate() {
    if (this.start.date === null || this.end.date === null) {
      this.valid = true
      return
    }

    const s = moment(this.start.date)
    const e = moment(this.end.date)

    this.valid = s.isBefore(e)
  }

  submit() {
    const opts: Filter = {}

    if (this.start.date) {
      opts.start = this.start.date
    }

    if (this.end.date) {
      opts.end = this.end.date
    }

    if (this.orderNumber) {
      opts.order = this.orderNumber
    }

    this.onFilter.emit(opts)
  }

  ngOnDestroy() {
    this.start.destroy()
    this.end.destroy()
  }

}
