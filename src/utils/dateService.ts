import dayjs from "dayjs"
import monthNames from "@/data/monthNames"
import CONSTANTS from "@/data/constants"
import { Months, Weekdays } from "@/models"

const dateService = {
  renderMonthNames(value: dayjs.Dayjs | number | string, ...args:any[]) {
    return monthNames[dayjs(value).month()]
  },
  dateStringToNormalString(dateString: string):dayjs.Dayjs {
    return dayjs(dayjs(dateString).format('DD.MM.YYYY'))
  },
  getMonthName(month: Months) {
    return CONSTANTS.DATE.MONTH_NAMES[month]
  },
  getWeekdayName(weekday: Weekdays) {
    return CONSTANTS.DATE.WEEKDAY_NAMES[weekday]
  }
}


export const {dateStringToNormalString, renderMonthNames} = dateService

export default dateService