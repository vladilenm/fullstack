const Order = require('../models/order')
const moment = require('moment')
const errorHandler = require('../utils/error')

module.exports.getOverview = async function(req, res) {
  try {
    const allOrders = await Order.find({user: req.user.id}).sort({date: 1})
    const ordersMap = getOrdersMap(allOrders)
    const yesterdayOrders = ordersMap[moment().add(-1, 'd').format('DD.MM.YYYY')] || []

    // Количество заказов
    const totalOrdersNumber = allOrders.length

    // console.log(JSON.stringify(ordersMap, null, 2))
    // Всего количество дней
    const daysNumber = Object.keys(ordersMap).length
    // Количество заказов вчера
    const yesterdayOrdersNumber = yesterdayOrders.length
    // Заказов в день
    const ordersPerDay = (totalOrdersNumber / daysNumber).toFixed(0)
    // Процент для количества заказов
    const ordersPercent = (((yesterdayOrdersNumber / ordersPerDay) - 1) * 100).toFixed(2)
    // Общая выручка
    const totalGain = calculatePrice(allOrders)
    // Выручка в день
    const gainPerDay = totalGain / daysNumber
    // Выручка за вчера
    const yesterdayGain = calculatePrice(yesterdayOrders).toFixed(2)
    // Процент выручка
    const gainPercent = (((yesterdayGain / gainPerDay) - 1) * 100).toFixed(2)
    // Сравнение выручки
    const compareGain = (yesterdayGain - gainPerDay).toFixed(2)
    // Сравнение количетсво заказов
    const compareNumber = (yesterdayOrdersNumber - ordersPerDay).toFixed(0)

    res.status(200).json({
      gain: {
        percent: Math.abs(+gainPercent),
        compare: Math.abs(+compareGain),
        yesterday: +yesterdayGain,
        isHigher: +gainPercent > 0
      },
      orders: {
        percent: Math.abs(+ordersPercent),
        compare: Math.abs(+compareNumber),
        yesterday: +yesterdayOrdersNumber,
        isHigher: +ordersPercent > 0
      }
    })

  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.getAnalytics = async function(req, res) {
  try {
    const allOrders = await Order.find({user: req.user.id}).sort({date: 1})
    const ordersMap = getOrdersMap(allOrders)

    const average = calculatePrice(allOrders) / Object.keys(ordersMap).length

    const chart = Object.keys(ordersMap).map(label => {
      const gain = calculatePrice(ordersMap[label])
      const order = ordersMap[label].length
      return {
        label, gain, order
      }
    })

    res.status(200).json({
      chart,
      average: +average.toFixed(2)
    })
  } catch (e) {
    errorHandler(res, e)
  }
}


function calculatePrice(orders = []) {
  return orders.reduce((total, order) => {
    const orderPrice = order.list.reduce((orderTotal, item) => {
      return orderTotal += item.cost * item.quantity
    }, 0)
    return total += orderPrice
  }, 0)
}

function getOrdersMap(orders = []) {
  const daysOrder = {}
  orders.forEach(order => {
    const date = moment(order.date).format('DD.MM.YYYY')

    // Не счиаем текущий день
    if (date === moment().format('DD.MM.YYYY')) {
      return
    }

    if (!daysOrder[date]) {
      daysOrder[date] = []
    }

    daysOrder[date].push(order)
  })
  return daysOrder
}