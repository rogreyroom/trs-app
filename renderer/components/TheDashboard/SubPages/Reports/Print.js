import endOfMonth from 'date-fns/endOfMonth'
import eachDayOfInterval from 'date-fns/eachDayOfInterval'
import isWithinInterval from 'date-fns/isWithinInterval'
import isSunday from 'date-fns/isSunday'
import isSaturday from 'date-fns/isSaturday'
import format from 'date-fns/format'
import { pl } from 'date-fns/locale'

import { forwardRef } from 'react'
import styled, { css } from 'styled-components';
import { getCurrentMonthOvertimeHours, getCurrentMonthWeekendsHours, getCurrentMonthWorkedHours, getHolidayLeaveDaysForCurrentMonth, getOtherLeaveDaysForCurrentMonth, getSickLeaveDaysForCurrentMonth } from '@/lib/utils'

const PrintArea = styled.div`
  margin: 0;
  padding: var(--xl);
  display: grid;
  grid-template-areas: 'name month' 'summary summary' 'table table';
  grid-template-columns: max-content 1fr;
  grid-gap: var(--xl);
  align-items: baseline;

  & > h2 {
    grid-area: name;
    font-size: var(--fs-h1);
    font-weight: var(--fw-light);
    color: var(--c-white);

    @media print {
      color: var(--c-print-black);
    }
    /* padding: 0.25em 0.5em; */
  }

  & > h4 {
    grid-area: month;
    justify-self: start;
    margin: 0;
    font-size: var(--fs-h4);
    font-weight: var(--fw-light);
    color: var(--c-white);
    /* padding: 0.25em 0.5em; */
    @media print {
      color: var(--c-print-black);
    }
  }

  & > div {
    grid-area: summary;
    margin: 0;

    & p {
        margin: 0;
        padding: 0;

        @media print {
          color: var(--c-print-black);
        }

        & span:first-of-type {
          font-weight: var(--fw-normal);
        }
      }
  }

  table, th, td {
    border: 1px solid var(--c-white);
  }

  & table {
    grid-area: table;
    margin: 0;
    border-collapse: collapse;
    width: 100%;

    @media print {
      max-width: 80%;
      margin: 0 auto;
    }
  }

  & .weekend {
    background: var(--c-blue-03);

    @media print {
      background: var(--c-print-grey-01);
    }
  }

  & th {
    font-size: var(--fs-text);
    font-weight: var(--fw-light);
    color: var(--c-white);
    padding: 0.25em 0.5em;

    @media print {
      color: var(--c-print-black);
    }
  }

  & .day {
    max-width: min-content;
  }
  & td {
    font-size: var(--fs-text);
    font-weight: var(--fw-light);
    color: var(--c-white);
    @media print {
      color: var(--c-print-black);
    }
    text-align: center;
  }
`

const StyledDay = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  & span {
    display: block;
    margin: 0;
    text-align: center;
    padding: var(--xxs) var(--xs);
  }

  & span:first-child {
    background: var(--c-blue-03);

    @media print {
      background: var(--c-print-grey-01);
    }
  }

  & span:last-child {
    background: var(--c-blue-01);

    @media print {
      background: var(--c-print-grey-03);
    }
  }
`

export const EmployeeCalendar = forwardRef(({ employeeData }, ref) => {
  const { employeeName, year, month, data } = employeeData
  const theStartOfMonth = new Date(year, month - 1, 1)
  const theEndOfMonth = endOfMonth(theStartOfMonth)
  const daysArray = eachDayOfInterval(
    { start: theStartOfMonth, end: theEndOfMonth }
  )
  const monthName = format(theStartOfMonth, 'LLLL', { locale: pl })

  const getIsLeaveDay = (leaveArray, dayObject) => {
    const isLeaveDay = leaveArray.some(({from, to}) => {
      return isWithinInterval(
        new Date(dayObject.year, dayObject.month, dayObject.day),
        { start: new Date(from.year, from.month, from.day), end: new Date(to.year, to.month, to.day) }
      )
    })
    return isLeaveDay
  }

  const getLeaveDays = (dayDate, data) => {
    if ( getIsLeaveDay(data.holiday_leave, dayDate) ) {
      return { leave: 'UW' }
    } else if ( getIsLeaveDay(data.sick_leave, dayDate) ) {
      return { leave: 'L4' }
    } else if ( getIsLeaveDay(data.other_leave, dayDate) ) {
      return { leave: 'UO' }
    } else {
      return false
    }
  }

  const getWorkingDay = (day, dayObject, data) => {
    const hoursData = data.rts.filter(({ due_date }) => JSON.stringify(due_date) === JSON.stringify(dayObject))[0]
    const returnData = isSaturday(day) || isSunday(day) ?
                        hoursData && { hours: hoursData.weekend_hours, overtime: 0 } ||  { hours: 0, overtime: 0 } :
                        hoursData && { hours: hoursData.working_hours, overtime: hoursData.overtime_hours } || { hours: 0, overtime: 0 }
    return returnData
  }

  const displayData = daysArray.reduce((res, day) => {
    const dayNumber = format(day, 'dd', { locale: pl })
    const dayName = format(day, 'EEEEE', { locale: pl }).toLocaleUpperCase()
    const dayDate = { day: parseInt(format(day, 'd')), month: month, year: year }
    const isLeaveDay = getLeaveDays(dayDate, data)
    const workingDayData = !isLeaveDay && getWorkingDay(day, dayDate, data)
    res.push({ day, dayName, dayNumber, isLeaveDay, workingDayData })
    return res
  }, [])

  console.log('Print data', data);

  const workedHours = getCurrentMonthWorkedHours(data)
  const overtimeHours = getCurrentMonthOvertimeHours(data)
  const weekendsHours = getCurrentMonthWeekendsHours(data)
  const holidayDays = getHolidayLeaveDaysForCurrentMonth(data)
  const sickDays = getSickLeaveDaysForCurrentMonth(data)
  const otherLeaveDays = getOtherLeaveDaysForCurrentMonth(data)

  return (
    <PrintArea ref={ref}>
      <h2>{ employeeName }</h2>
      <h4>{ year } / { monthName }</h4>
      <div>
        <p>Ilość godzin: <span>{ workedHours }</span> <span>godz</span></p>
        <p>Ilość nadgodzin: <span>{ overtimeHours }</span> <span>godz</span></p>
        <p>Ilość dyżurów: <span>{ weekendsHours }</span> <span>godz</span></p>
        <p>Ilość urlopu: <span>{ holidayDays }</span> <span>{ holidayDays === 1 ? 'dzień' : 'dni' }</span></p>
        <p>Ilość urlopu okolicznościowego: <span>{ sickDays }</span> <span>{ sickDays === 1 ? 'dzień' : 'dni' }</span></p>
        <p>Ilość chorobowego: <span>{ otherLeaveDays }</span> <span>{ otherLeaveDays === 1 ? 'dzień' : 'dni' }</span></p>
      </div>
      <table>
        <thead>
          <tr>
            <th>Dzień</th>
            <th>Obecność</th>
            <th>Nadgodziny</th>
            <th>Nieobecność</th>
          </tr>
        </thead>
        <tbody>
          {
            displayData.map(({ day, dayName, dayNumber, isLeaveDay, workingDayData }) => {
              const isWeekend = isSaturday(day) || isSunday(day) ? 'weekend' : ''
              return (
                <tr key={dayNumber + dayName} className={isWeekend} >
                  <td className='day'>
                    <StyledDay><span>{ dayNumber }</span>  <span>{ dayName }</span></StyledDay>
                  </td>
                  <td>{ workingDayData && workingDayData.hours }</td>
                  <td>{ workingDayData && workingDayData.overtime }</td>
                  <td>{ isLeaveDay && isLeaveDay.leave }</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </PrintArea>
  )
})
