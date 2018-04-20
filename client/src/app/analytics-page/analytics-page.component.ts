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

  constructor(private analyticsService: AnalyticsService) {
  }

  ngAfterViewInit() {
    const gainCtx = this.gainChartRef.nativeElement.getContext('2d')
    const orderCtx = this.orderChartRef.nativeElement.getContext('2d')
    gainCtx.canvas.height = 300 + 'px'
    orderCtx.canvas.height = 300 + 'px'
    this.analyticsService.fetchAnalytics().subscribe(chart => {
      const gainConfig = {
        labels: chart.map(i => i.label),
        data: chart.map(i => i.gain),
        label: 'Выручка',
        color: 'rgb(255, 99, 132)',
        title: 'График выручки'
      }
      const orderConfig = {
        labels: chart.map(i => i.label),
        data: chart.map(i => i.order),
        label: 'Заказы',
        color: 'rgb(54, 162, 235)',
        title: 'График заказов'
      }
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
      responsive: true,
      title: {
        display: true,
        text: title,
      }
    }
  }
}
