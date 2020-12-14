export const getUsedHolidayDays = (employeeCalendar) => {
  const currYear = new Date().getFullYear()
  const currentYearMonths = employeeCalendar.filter(({year}) => parseInt(year) === currYear)[0].months
  const holidayAmountsArray = currentYearMonths.map(month => getHolidayLeaveDaysForCurrentMonth(month))
  return holidayAmountsArray.reduce((a, b) => parseInt(a) + parseInt(b), 0)
}

export const getUsedSickDays = (employeeCalendar) => {
  const currYear = new Date().getFullYear()
  const currentYearMonths = employeeCalendar.filter(({year}) => parseInt(year) === currYear)[0].months
  const holidayAmountsArray = currentYearMonths.map(month => getSickLeaveDaysForCurrentMonth(month))
  return holidayAmountsArray.reduce((a, b) => parseInt(a) + parseInt(b), 0)
}

export const getUsedLeaveDays = (employeeCalendar) => {
  const currYear = new Date().getFullYear()
  const currentYearMonths = employeeCalendar.filter(({year}) => parseInt(year) === currYear)[0].months
  const holidayAmountsArray = currentYearMonths.map(month => getOtherLeaveDaysForCurrentMonth(month))
  return holidayAmountsArray.reduce((a, b) => parseInt(a) + parseInt(b), 0)
}

export const getCurrentMonthData = (employeeCalendar) => {
  const currYear = new Date().getFullYear()
  const currMonth = new Date().getMonth() + 1
  const currentYearMonths = employeeCalendar.filter(({year}) => parseInt(year) === currYear)[0].months
  return currentYearMonths.filter(({month}) => parseInt(month) == currMonth)
}

export const getHolidayLeaveDaysForCurrentMonth = (currentMonthData) => {
  console.log('currentMonthData', currentMonthData);
  const holidayLeaveDaysArray = currentMonthData.holiday_leave.map(({ days }) => days)
  return holidayLeaveDaysArray.reduce((a, b) => parseInt(a) + parseInt(b), 0)
}

export const getSickLeaveDaysForCurrentMonth = (currentMonthData) => {
  const sickLeaveDaysArray = currentMonthData.sick_leave.map(({ days }) => days)
  return sickLeaveDaysArray.reduce((a, b) => parseInt(a) + parseInt(b), 0)
}

export const getOtherLeaveDaysForCurrentMonth = (currentMonthData) => {
  const otherLeaveDaysArray = currentMonthData.other_leave.map(({days})=> days)
  return otherLeaveDaysArray.reduce((a, b) => parseInt(a) + parseInt(b), 0)
}

export const getCurrentMonthWorkedHours = (currentMonthData) => {
  const workingHoursArray = currentMonthData.rts.map(({working_hours}) => working_hours)
  console.log('workingHoursArray', workingHoursArray)
  return workingHoursArray.reduce((a, b) => parseInt(a) + parseInt(b), 0)
}

export const getCurrentMonthOvertimeHours = (currentMonthData) => {
  const overtimeHoursArray = currentMonthData.rts.map(({overtime_hours}) => overtime_hours)
  return overtimeHoursArray.reduce((a, b) => parseInt(a) + parseInt(b), 0)
}

export const getCurrentMonthWeekendsHours = (currentMonthData) => {
  const weekendHoursArray = currentMonthData.rts.map(({weekend_hours}) => weekend_hours)
  return weekendHoursArray.reduce((a, b) => parseInt(a) + parseInt(b), 0)
}


export const getCurrentMonthHourlyRate = (currentMonthData) => {
  return currentMonthData.hourly_rate
}

export const getCurrentMonthOvertimeRate = (currentMonthData) => {
  return currentMonthData.overtime_rate
}

export const getCurrentMonthHolidayRate = (currentMonthData) => {
  return currentMonthData.holiday_rate
}

export const getCurrentMonthSickLeaveRate = (currentMonthData) => {
  return currentMonthData.sick_leave_rate
}

export const getCurrentMonthInsuranceRate = (currentMonthData) => {
  return currentMonthData.insurance_rate
}

export const getCurrentMonthBonusRate = (currentMonthData) => {
  return currentMonthData.bonus_rate
}

export const getCurrentMonthHourlyRateMultiplier = (currentMonthData) => {
  return currentMonthData.hourly_rate_multiplier
}