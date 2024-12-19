import moment from 'moment/moment'

export const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  let separateWord = s.toLowerCase().split(' ')
  for (let i = 0; i < separateWord.length; i++) {
    separateWord[i] = separateWord[i].charAt(0).toUpperCase() + separateWord[i].substring(1)
  }
  return separateWord.join(' ')
}
// === Check the seeing data is logged on user's or not  === //
export const isLoggedUserDataOwner = (userData, dataId) => {
  if (userData) {
    return userData?.id == dataId
  }
  return false
}
// === Create serial number using page and  index === //
export const createListSerialNo = (page, index) => {
  return (page - 1) * 10 + (index + 1)
}

// === Change the date time formate of schedule time === //
export const changeScheduleTimeFormat = (schedule_time) => {
  return schedule_time ? moment(schedule_time).format('YYYY-MM-DD hh:mm A') : schedule_time
}
