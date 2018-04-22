import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core'
import {Chart} from 'chart.js'
import {AnalyticsService} from '../shared/services/analytics.service'

@Component({
  selector: 'app-analytics-page',
  templateUrl: './analytics-page.component.html',
  styleUrls: ['./analytics-page.component.css']
})
export class AnalyticsPageComponent implements AfterViewInit {

  @ViewChild('gainChartRef') gainChartRef: ElementRef
  @ViewChild('orderChartRef') orderChartRef: ElementRef

  loading = true
  average: number

  constructor(private analyticsService: AnalyticsService) {
  }

  ngAfterViewInit() {
    const gainConfig: any = {
      label: 'Выручка',
      color: 'rgb(255, 99, 132)'
    }

    const orderConfig: any = {
      label: 'Заказы',
      color: 'rgb(54, 162, 235)'
    }

    this.analyticsService.fetchAnalytics().subscribe(({chart, average}) => {
      this.loading = false
      this.average = average

      gainConfig.labels = chart.map(i => i.label)
      gainConfig.data = chart.map(i => i.gain)

      orderConfig.labels = chart.map(i => i.label)
      orderConfig.data = chart.map(i => i.order)

      const gainCtx = this.gainChartRef.nativeElement.getContext('2d')
      const orderCtx = this.orderChartRef.nativeElement.getContext('2d')
      gainCtx.canvas.height = 300 + 'px'
      orderCtx.canvas.height = 300 + 'px'
      new Chart(gainCtx, createConfig(gainConfig))
      new Chart(orderCtx, createConfig(orderConfig))
    })
  }
}

function createConfig({labels, data, label, color, title}) {
  return {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: label,
          steppedLine: false,
          data: data,
          borderColor: color,
          fill: false
        }
      ]
    },
    options: {
      responsive: true
    }
  }
}
