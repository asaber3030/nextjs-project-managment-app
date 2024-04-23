import moment from 'moment'

export function diffForHuman(date: Date) {
  return moment(date).fromNow()
}