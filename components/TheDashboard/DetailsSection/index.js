import { useContext, useState } from 'react';
import { SubPagesContext } from '@/contexts/SubPagesContext';
// import Link from 'next/link'
import styled from 'styled-components';
import { TextButton } from '@/components/common/Buttons';

import { getCurrentMonthData, getHolidayLeaveDaysForCurrentMonth, getSickLeaveDaysForCurrentMonth, getOtherLeaveDaysForCurrentMonth, getUsedHolidayDays, getCurrentMonthWorkedHours, getCurrentMonthOvertimeHours, getCurrentMonthWeekendsHours } from '@/lib/utils'

const EmployeeDetailsSection = styled.section`
  grid-area: details;
  display: grid;
  grid-template-areas: 'link link' 'content1 content1' 'content2 content2' 'more more' 'content3 content3';
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 32px repeat(2, min-content) 32px min-content;
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
  const [page, setPage] = useContext(SubPagesContext)
  const [isClicked, setIsClicked] = useContext(SubPagesContext)
  const [show, setShow] = useState(false)

  const overdue = assignedLeaveDays.overdue
  const assigned = assignedLeaveDays.assigned
  const leaveDaysAmount = overdue + assigned
  const leaveDaysAmountLeft = leaveDaysAmount - getUsedHolidayDays(employeeCalendar)

  const currentMonthData = getCurrentMonthData(employeeCalendar)
  const currentMonthHolidaysAmount = getHolidayLeaveDaysForCurrentMonth(currentMonthData)
  const currentMonthSicksAmount = getSickLeaveDaysForCurrentMonth(currentMonthData)
  const currentMonthOtherLeavesAmount = getOtherLeaveDaysForCurrentMonth(currentMonthData)

  const currentMonthWorkedHoursAmount = getCurrentMonthWorkedHours(currentMonthData)
  const currentMonthOvertimeHoursAmount = getCurrentMonthOvertimeHours(currentMonthData)
  const currentMonthWeekendsHoursAmount = getCurrentMonthWeekendsHours(currentMonthData)

  const currentMonthHourlyRate = 1
  const currentMonthOvertimeRate = 1
  const currentMonthHolidayRate = 1
  const currentMonthSickLeaveRate = 1
  const currentMonthInsuranceRate = 1
  const currentMonthBonusRate = 1
  const currentMonthHourlyRateMultiplier = 1

  const handleSubPageClick = (pageName) => {
    setPage(pageName)
    setIsClicked(isClicked => pageName)
  }

  return (
    <EmployeeDetailsSection>
      <div className='first-link'>
        <TextButton isUnderlined isActive={isClicked === 'responsibilities' ? true : false} onClickAction={() => handleSubPageClick('responsibilities')}>
          Zakres obowiązków
        </TextButton>
      </div>
      <EmployeeDetailsSectionContent area='content1'>
        <h4>Stan:</h4>
        <p>Urlop zaległy za rok poprzedni</p><span>{ overdue }</span>
        <p>Urlop przydzielony</p><span>{ assigned }</span>
        <p>Urlop do wykorzystania</p><span>{ leaveDaysAmount }</span>
        <p>Urlop pozostały</p><span>{ leaveDaysAmountLeft }</span>
        <p>Chorobowe</p><span>{ currentMonthSicksAmount }</span>
        <p>Inne wolne</p><span>{ currentMonthOtherLeavesAmount }</span>
      </EmployeeDetailsSectionContent>
      <EmployeeDetailsSectionContent area='content2'>
        <h4>Aktualny miesiąc:</h4>
        <p>Ilość przepracowanych godzin</p><span>{ currentMonthWorkedHoursAmount }</span>
        <p>Ilość przepracowanych nadgodzin</p><span>{ currentMonthOvertimeHoursAmount }</span>
        <p>Ilość przepracowanych w weekend</p><span>{ currentMonthWeekendsHoursAmount }</span>
        <p>Urlop w miesiącu</p><span>{ currentMonthHolidaysAmount }</span>
        <p>Chorobowe w miesiącu</p><span>{ currentMonthSicksAmount }</span>
        <p>Inne wolne w miesiącu</p><span>{ currentMonthOtherLeavesAmount }</span>
      </EmployeeDetailsSectionContent>
      <div   className='second-link'>
        <TextButton isUnderlined isActive={show} onClickAction={() => setShow(show => !show)}>
          { !show && ( 'Więcej' ) || ( 'Mniej' ) }
        </TextButton>
      </div>
      { show && (
        <EmployeeDetailsSectionContent area='content3'>
          <h4>Szczegóły:</h4>
          <p>Data zatrudnienia</p><span>{ employmentDates.start }</span>
          <p>Data rozwiązania umowy</p><span>{ employmentDates.end }</span>
          <p>Stawka godzinowa</p><span>{ currentMonthHourlyRate }</span>
          <p>Stawka nadgodzinowa</p><span>{ currentMonthOvertimeRate }</span>
          <p>Stawka urlopowa</p><span>{ currentMonthHolidayRate }</span>
          <p>Stawka chorobowe</p><span>{ currentMonthSickLeaveRate }</span>
          <p>Stawka PZU</p><span>{ currentMonthInsuranceRate }</span>
          <p>Podstawa premii</p><span>{ currentMonthBonusRate }</span>
          <p>Mnożnik ilości godzin</p><span>{ currentMonthHourlyRateMultiplier }</span>
        </EmployeeDetailsSectionContent>
      )}
    </EmployeeDetailsSection>
  )
}
