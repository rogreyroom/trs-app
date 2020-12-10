import { Aside } from '@/components/Aside'
import { Main } from '@/components/Main'
import { Header, MainNav, DetailsSection, ContentSection } from '@/components/Employee'
import { SubPagesProvider } from '@/contexts/SubPagesContext'

import { useContext, useState, useEffect } from 'react'
import { DashboardContext } from '@/contexts/DashboardContext'

export const Board = ({ data }) => {
  // const [employees, setEmployees] = useContext(DashboardContext).data
  const [employee, setEmployee] = useContext(DashboardContext).employee
  const [addEmployeePage, setAddEmployeePage] = useContext(DashboardContext).add



  if ( addEmployeePage ) {
    return (
    <>
      <Aside />
      <Main>
        <h1>Add Employee page</h1>
        <p>some form to add new data</p>
        <p>Add some extra styles to the main component when adding new employee</p>
      </Main>
    </>
    )
  } else if (employee) {
    const data1 = data.filter(emp => emp._id === employee)

    console.log('BOARD DATA', data, employee, data1);

  const {
    _id,
    name,
    surname,
    position,
    juvenile_worker,
    employment_status,
    overdue_leave_amount,
    assigned_leave_amount,
    calendar,
    employment_start_date,
    employment_termination_date
  } = data1[0]


  return (
    <>
      <Aside />
      <Main dashboard>
        <Header name={`${name} ${surname}`} position={position} juvenile={juvenile_worker} status={employment_status}  />
        <SubPagesProvider>
          <MainNav employee={employee} />
          <DetailsSection employeeCalendar={calendar} assignedLeaveDays={{overdue: overdue_leave_amount, assigned: assigned_leave_amount}} employmentDates={{start: employment_start_date, end: employment_termination_date}}/>
          <ContentSection employee={employee} />
        </SubPagesProvider>
      </Main>
    </>
  )

} else {
    return (
    <>
      <Aside />
    </>
  )
}


}