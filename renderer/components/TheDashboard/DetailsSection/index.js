import styled from 'styled-components';
import { useContext, useState } from 'react';
import { SubPagesContext } from '@/contexts/SubPagesContext';
import { TextButton } from '@/common/Buttons';
import {
  getCurrentMonthData,
  getHolidayLeaveDaysForCurrentMonth,
  getUsedSickDays,
  getUsedLeaveDays,
  getSickLeaveDaysForCurrentMonth,
  getOtherLeaveDaysForCurrentMonth,
  getUsedHolidayDays,
  getCurrentMonthWorkedHours,
  getCurrentMonthOvertimeHours,
  getCurrentMonthWeekendsHours,
} from '@/lib/utils'

const EmployeeDetailsSection = styled.section`
  grid-area: details;
  display: grid;
  grid-template-areas: 'link link' 'content1 content1' 'content2 content2';
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 32px repeat(2, min-content);
  margin: 0;
  margin-top: var(--xl);
  padding-top: var(--xl);
  text-align: right;
  color: var(--c-white);

  & .first-link {
    grid-area: link;
    margin-right: 64px;
    justify-self: end;
  }

  & .second-link {
    grid-area: more;
    margin-top: 0;
    margin-right: 64px;
    justify-self: end;
  }
`
const EmployeeDetailsSectionContent = styled.section`

grid-area: ${props => props.area};
display: grid;
grid-template-columns: 226px 96px;
/* 245px 35px; */
grid-auto-rows: minmax(32px, min-content);
margin: 0 0 var(--xl) 0;

& h4 {
  grid-column: 1 / 2;
  grid-row: 1;
  margin: 0;
}

& p {
  grid-column: 1 / 2;
  margin: 0;
}

& span {
  grid-column: 2 / 3;
  margin: 0;
  color: var(--c-accent);
  justify-self: center;
}
`


export const DetailsSection = ({ employeeCalendar, assignedLeaveDays, employmentDates }) => {
  const [page, setPage] = useContext(SubPagesContext).page

  const overdue = assignedLeaveDays.overdue
  const assigned = assignedLeaveDays.assigned
  const leaveDaysAmount = overdue + assigned
  const leaveDaysAmountLeft = leaveDaysAmount - getUsedHolidayDays(employeeCalendar)  // NaN
  const sickDaysAmount = getUsedSickDays(employeeCalendar)
  const otherLeaveDaysAmount = getUsedLeaveDays(employeeCalendar)
  const currentMonthData = getCurrentMonthData(employeeCalendar)[0]
  const workedHours = getCurrentMonthWorkedHours(currentMonthData)
  const overtimeHours = getCurrentMonthOvertimeHours(currentMonthData)
  const weekendsHours = getCurrentMonthWeekendsHours(currentMonthData)
  const holidayDays = getHolidayLeaveDaysForCurrentMonth(currentMonthData)
  const sickDays = getSickLeaveDaysForCurrentMonth(currentMonthData)
  const otherLeaveDays = getOtherLeaveDaysForCurrentMonth(currentMonthData)

  const handleSubPageClick = (pageName) => {
    setPage(page => pageName)
  }

  return (
    <EmployeeDetailsSection>
      <div className='first-link'>
        <TextButton isUnderlined isActive={page === 'responsibilities' ? true : false} onClickAction={() => handleSubPageClick('responsibilities')}>
          Zakres obowiązków
        </TextButton>
      </div>
      <EmployeeDetailsSectionContent area='content1'>
        <h4>Stan:</h4>
        <p>Urlop zaległy za rok poprzedni</p><span>{ overdue }</span>
        <p>Urlop przydzielony</p><span>{ assigned }</span>
        <p>Urlop do wykorzystania</p><span>{ leaveDaysAmount }</span>
        <p>Urlop pozostały</p><span>{ leaveDaysAmountLeft }</span>
        <p>Chorobowe</p><span>{ sickDaysAmount }</span>
        <p>Inne wolne</p><span>{ otherLeaveDaysAmount }</span>
      </EmployeeDetailsSectionContent>
      <EmployeeDetailsSectionContent area='content2'>
        <h4>Aktualny miesiąc:</h4>
        <p>Suma godzin</p><span>{ workedHours + overtimeHours + weekendsHours }</span>
        <p>Ilość przepracowanych godzin</p><span>{ workedHours }</span>
        <p>Ilość przepracowanych nadgodzin</p><span>{ overtimeHours }</span>
        <p>Ilość przepracowanych w weekend</p><span>{ weekendsHours }</span>
        <p>Urlop w miesiącu</p><span>{ holidayDays }</span>
        <p>Chorobowe w miesiącu</p><span>{ sickDays }</span>
        <p>Inne wolne w miesiącu</p><span>{ otherLeaveDays }</span>
      </EmployeeDetailsSectionContent>
    </EmployeeDetailsSection>
  )
}
