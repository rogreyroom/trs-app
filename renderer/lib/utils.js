import {eachDayOfInterval, isSaturday, isSunday} from 'date-fns';

const getNumberOfWorkingDays = (startDate, endDate) => {
  // TODO: add some array of public holidays and subtract them from datesArray
  const datesArray = eachDayOfInterval({start: startDate, end: endDate});
  const weekDaysArray = datesArray.reduce((res, date) => {
    if (!isSaturday(date) && !isSunday(date)) res.push(date);
    return res;
  }, []);
  return weekDaysArray.length;
};
const getNumberOfDays = (startDate, endDate) => {
  // TODO: add some array of public holidays and subtract them from datesArray
  const datesArray = eachDayOfInterval({start: startDate, end: endDate});
  return datesArray.length;
};

export const getHolidayLeaveDaysForCurrentMonth = (currentMonthData) => {
  const holidayLeaveDaysArray = currentMonthData.holiday_leave.map((leave) => {
    const dateFrom = new Date(leave.from.year, leave.from.month - 1, leave.from.day);
    const dateTo = new Date(leave.to.year, leave.to.month - 1, leave.to.day);
    return getNumberOfWorkingDays(dateFrom, dateTo);
  });
  return holidayLeaveDaysArray.reduce((a, b) => parseInt(a, 10) + parseInt(b, 10), 0);
};

export const getSickLeaveDaysForCurrentMonth = (currentMonthData) => {
  const sickLeaveDaysArray = currentMonthData.sick_leave.map((leave) => {
    const dateFrom = new Date(leave.from.year, leave.from.month - 1, leave.from.day);
    const dateTo = new Date(leave.to.year, leave.to.month - 1, leave.to.day);
    return getNumberOfDays(dateFrom, dateTo);
  });
  return sickLeaveDaysArray.reduce((a, b) => parseInt(a, 10) + parseInt(b, 10), 0);
};

export const getOtherLeaveDaysForCurrentMonth = (currentMonthData) => {
  const otherLeaveDaysArray = currentMonthData.other_leave.map((leave) => {
    const dateFrom = new Date(leave.from.year, leave.from.month - 1, leave.from.day);
    const dateTo = new Date(leave.to.year, leave.to.month - 1, leave.to.day);
    return getNumberOfWorkingDays(dateFrom, dateTo);
  });
  return otherLeaveDaysArray.reduce((a, b) => parseInt(a, 10) + parseInt(b, 10), 0);
};

export const getEmployeeYears = (employeeCalendar) =>
  employeeCalendar.map(({year}) => parseInt(year, 10));

export const getUsedHolidayDays = (employeeCalendar) => {
  const currYear = new Date().getFullYear();
  const currentYearMonths = employeeCalendar.filter(({year}) => parseInt(year, 10) === currYear)[0]
    ?.months;
  const holidayAmountsArray = currentYearMonths?.map((month) =>
    getHolidayLeaveDaysForCurrentMonth(month)
  );
  return holidayAmountsArray?.reduce((a, b) => parseInt(a, 10) + parseInt(b, 10), 0);
};

export const getUsedSickDays = (employeeCalendar) => {
  const currYear = new Date().getFullYear();
  const currentYearMonths = employeeCalendar.filter(({year}) => parseInt(year, 10) === currYear)[0]
    ?.months;
  const holidayAmountsArray = currentYearMonths?.map((month) =>
    getSickLeaveDaysForCurrentMonth(month)
  );
  return holidayAmountsArray?.reduce((a, b) => parseInt(a, 10) + parseInt(b, 10), 0);
};

export const getUsedLeaveDays = (employeeCalendar) => {
  const currYear = new Date().getFullYear();
  const currentYearMonths = employeeCalendar.filter(({year}) => parseInt(year, 10) === currYear)[0]
    ?.months;
  const holidayAmountsArray = currentYearMonths?.map((month) =>
    getOtherLeaveDaysForCurrentMonth(month)
  );
  return holidayAmountsArray?.reduce((a, b) => parseInt(a, 10) + parseInt(b, 10), 0);
};

export const getCurrentMonthData = (employeeCalendar) => {
  const currYear = new Date().getFullYear();
  const currMonth = new Date().getMonth() + 1;
  const currentYearMonths = employeeCalendar.filter(({year}) => parseInt(year, 10) === currYear)[0]
    ?.months;
  return currentYearMonths?.filter(({month}) => parseInt(month, 10) === currMonth);
};

export const getGivenMonthData = (employeeCalendar, year, month) => {
  const givenYear = year;
  const givenMonth = month;
  const givenYearMonths = employeeCalendar.filter(({year}) => parseInt(year, 10) === givenYear)[0]
    ?.months;
  return givenYearMonths?.filter(({month}) => parseInt(month, 10) === givenMonth);
};

export const getCurrentMonthWorkedHours = (currentMonthData) => {
  const workingHoursArray = currentMonthData.rts.map(({working_hours}) => working_hours);
  return workingHoursArray.reduce((a, b) => parseInt(a, 10) + parseInt(b, 10), 0);
};

export const getCurrentMonthOvertimeHours = (currentMonthData) => {
  const overtimeHoursArray = currentMonthData.rts.map(({overtime_hours}) => overtime_hours);
  return overtimeHoursArray.reduce((a, b) => parseInt(a, 10) + parseInt(b, 10), 0);
};

export const getCurrentMonthWeekendsHours = (currentMonthData) => {
  const weekendHoursArray = currentMonthData.rts.map(({weekend_hours}) => weekend_hours);
  return weekendHoursArray.reduce((a, b) => parseInt(a, 10) + parseInt(b, 10), 0);
};

export const getCurrentMonthHourlyRate = (currentMonthData) => currentMonthData.hourly_rate;

export const getCurrentMonthOvertimeRate = (currentMonthData) => currentMonthData.overtime_rate;

export const getCurrentMonthHolidayRate = (currentMonthData) => currentMonthData.holiday_rate;

export const getCurrentMonthSickLeaveRate = (currentMonthData) => currentMonthData.sick_leave_rate;

export const getCurrentMonthInsuranceRate = (currentMonthData) => currentMonthData.insurance_rate;

export const getCurrentMonthBonusRate = (currentMonthData) => currentMonthData.bonus_rate;

export const getCurrentMonthHourlyRateMultiplier = (currentMonthData) =>
  currentMonthData.hourly_rate_multiplier;

export const getMonthName = (month) => {
  const monthsArray = [
    'Styczeń',
    'Luty',
    'Marzec',
    'Kwiecień',
    'Maj',
    'Czerwiec',
    'Lipiec',
    'Sierpień',
    'Wrzesień',
    'Październik',
    'Listopad',
    'Grudzień',
  ];
  return monthsArray[month - 1];
};

const getLeaveDays = (arrayData, type) => {
  const resultArray = arrayData.reduce((accArr, month) => {
    switch (type) {
      case 'holiday':
        month.holiday_leave.length > 0 && accArr.push(...month.holiday_leave.map((el) => el));
        break;
      case 'sick':
        month.sick_leave.length > 0 && accArr.push(...month.sick_leave.map((el) => el));
        break;
      case 'other':
        month.other_leave.length > 0 && accArr.push(...month.other_leave.map((el) => el));
        break;
      default:
        return null;
    }
    return accArr;
  }, []);
  return resultArray;
};

export const getEmployeeHolidayDays = (employeeMonthsData) => {
  const holidayDays = getLeaveDays(employeeMonthsData, 'holiday');
  const holidayDaysArray = holidayDays.reduce((acc, cur) => {
    const holidayInterval = eachDayOfInterval({
      start: new Date(cur.from.year, cur.from.month - 1, cur.from.day),
      end: new Date(cur.to.year, cur.to.month - 1, cur.to.day),
    });
    holidayInterval.forEach((dayDate) => {
      const dateObject = {
        year: dayDate.getFullYear(),
        month: dayDate.getMonth() + 1,
        day: dayDate.getDate(),
        className: 'holidayDay',
      };
      acc.push(dateObject);
    });
    return acc;
  }, []);

  return holidayDaysArray;
};

export const getEmployeeSickDays = (employeeMonthsData) => {
  const sickDays = getLeaveDays(employeeMonthsData, 'sick');
  const sickDaysArray = sickDays.reduce((acc, cur) => {
    const sickInterval = eachDayOfInterval({
      start: new Date(cur.from.year, cur.from.month - 1, cur.from.day),
      end: new Date(cur.to.year, cur.to.month - 1, cur.to.day),
    });

    sickInterval.forEach((dayDate) => {
      const dateObject = {
        year: dayDate.getFullYear(),
        month: dayDate.getMonth() + 1,
        day: dayDate.getDate(),
        className: 'sickDay',
      };
      acc.push(dateObject);
    });
    return acc;
  }, []);

  return sickDaysArray;
};

export const getEmployeeOtherLeaveDays = (employeeMonthsData) => {
  const otherDays = getLeaveDays(employeeMonthsData, 'other');
  const otherDaysArray = otherDays.reduce((acc, cur) => {
    const otherInterval = eachDayOfInterval({
      start: new Date(cur.from.year, cur.from.month - 1, cur.from.day),
      end: new Date(cur.to.year, cur.to.month - 1, cur.to.day),
    });

    otherInterval.forEach((dayDate) => {
      const dateObject = {
        year: dayDate.getFullYear(),
        month: dayDate.getMonth() + 1,
        day: dayDate.getDate(),
        className: 'otherDay',
      };
      acc.push(dateObject);
    });
    return acc;
  }, []);

  return otherDaysArray;
};

export const getEmployeeWorkedDays = (employeeMonthsData) => {
  const workedDays = employeeMonthsData.reduce((acc, cur) => {
    cur.rts.length > 0 &&
      // eslint-disable-next-line array-callback-return
      cur.rts.map((day) => {
        if (
          (day.due_date && day.evaluation.length > 0) ||
          day.working_hours > 0 ||
          day.overtime_hours > 0 ||
          day.weekend_hours > 0
        ) {
          const dateObject = {
            ...day.due_date,
            className: 'workedDay',
          };
          acc.push(dateObject);
        }
      });
    return acc;
  }, []);

  return workedDays;
};
