export interface User {
  _id?: string
  password: string
  email: string
}

export interface Category {
  _id?: string
  imageSrc?: string
  name: string
  user?: string
}

export interface Position {
  _id?: string
  cost: number
  name: string
  category: string
  user?: string
}

export interface Message {
  message: string
}

export interface Order {
  _id?: string
  date?: Date
  order?: number
  user?: string
  list: OrderListItem[]
}

export interface OrderListItem {
  _id?: string
  name: string
  quantity: number
  cost: number
}

export interface Overview {
  gain: OverviewItem
  orders: OverviewItem
}

export interface Analytics {
  chart: AnalyticsChart[]
  average: number
}

export interface AnalyticsChart {
  gain: number
  order: number
  label: string
}

export interface OverviewItem  {
  percent: number
  compare: number
  yesterday: number
  isHigher: boolean
}
