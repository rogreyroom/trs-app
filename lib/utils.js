export const getCurrentMonthData = (employeeCalendar) => {
  // const currYear = new Date().getFullYear()
  // const currMonth = new Date().getMonth() + 1
  // const currentYearMonths = employeeCalendar.filter(({year}) => parseInt(year) === currYear)[0]
  // console.log('currentYearMonths', currentYearMonths);
  // return currentYearMonths.filter(({month}) => parseInt(month) == currMonth)
  return null
}

export const getHolidayLeaveDaysForCurrentMonth = (currentMonthData) => {
  // const holidayLeaveDaysArray = currentMonthData.map(({holiday}) => holiday.map(({days})=> days))[0]
  // return holidayLeaveDaysArray.reduce((a, b) => parseInt(a) + parseInt(b), 0)
  return null
}

export const getSickLeaveDaysForCurrentMonth = (currentMonthData) => {
  // const sickLeaveDaysArray = currentMonthData.map(({sick_leave}) => sick_leave.map(({days})=> days))[0]
  // return sickLeaveDaysArray.reduce((a, b) => parseInt(a) + parseInt(b), 0)
  return null
}

export const getOtherLeaveDaysForCurrentMonth = (currentMonthData) => {
  // const otherLeaveDaysArray = currentMonthData.map(({other_leave}) => other_leave.map(({days})=> days))[0]
  // return otherLeaveDaysArray.reduce((a, b) => parseInt(a) + parseInt(b), 0)
  return null
}

export const getUsedHolidayDays = (employeeCalendar) => {
  // const currYear = new Date().getFullYear()
  // const currentYearMonths = employeeCalendar.filter(({year}) => parseInt(year) === currYear)[0]
  // console.log('Current Year Months Data', currentYearMonths)

  // const holidayAmountsArray = currentYearMonths.map(({ month }) => {
  //   getHolidayLeaveDaysForCurrentMonth(month)
  // })
  // console.log('holidayAmountsArray', holidayAmountsArray)
  // return holidayAmountsArray.reduce((a, b) => parseInt(a) + parseInt(b), 0)
  return 0
}


// "rts":[
//   {"due_day":'11-11-2020', "working_hours": 8, "overtime_hours": 4, "weekend_hours": 0},
//   {"due_day":'11-11-2020', "working_hours": 0, "overtime_hours": 0, "weekend_hours": 6}
// ]


export const getCurrentMonthWorkedHours = (currentMonthData) => {
  // const workingHoursArray = currentMonthData.rts.map(({working_hours}) => working_hours)
  // console.log('workingHoursArray', workingHoursArray)
  // return workingHoursArray.reduce((a, b) => parseInt(a) + parseInt(b), 0)
  return null
}

export const getCurrentMonthOvertimeHours = (currentMonthData) => {
  // const overtimeHoursArray = currentMonthData.rts.map(({overtime_hours}) => overtime_hours)
  // return overtimeHoursArray.reduce((a, b) => parseInt(a) + parseInt(b), 0)
  return null
}

export const getCurrentMonthWeekendsHours = (currentMonthData) => {
  // const weekendHoursArray = currentMonthData.rts.map(({weekend_hours}) => weekend_hours)
  // return weekendHoursArray.reduce((a, b) => parseInt(a) + parseInt(b), 0)
  return null
}
