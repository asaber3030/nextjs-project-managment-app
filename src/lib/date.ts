import moment from 'moment'

export function diffForHuman(date: Date) {
  return moment(date).fromNow()
}

export function formatDate(date: Date, format: string = 'MMMM Do YYYY, h:mm a') {
  return moment(date).format(format)
}