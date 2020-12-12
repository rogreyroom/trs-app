import useSWR from 'swr'
import { axios } from '@/lib/axios-config'
import { useContext, useState, useEffect } from 'react'
import { DashboardContext } from '@/contexts/DashboardContext'
import { SubPagesProvider } from '@/contexts/SubPagesContext'
import { Aside } from '@/components/TheDashboard/Sidebar'
import { Main } from '@/components/TheDashboard/Main'
import { Header } from './Header'
import { MainNav } from './MainNav'
import { DetailsSection } from './DetailsSection'
import { ContentSection } from './ContentSection'
import { SvgPeople, SvgDashboard } from '../Icons'
import { TextButton, Button, IconButton } from '@/components/common/Buttons'

const fetcher = url => axios.get(url).then(res => res.data)

export const Board = () => {
  const [employees, setEmployees] = useContext(DashboardContext).data
  const [employee, setEmployee] = useContext(DashboardContext).employee
  const [addEmployeePage, setAddEmployeePage] = useContext(DashboardContext).add

  if ( addEmployeePage ) {
    return (
    <>
      <Aside />
      <Main>
        <h1>Add Employee page</h1>
        <p>Display form to add new data</p>
        <TextButton  isActive={true} onClickAction={() => console.log('Click Text')}>Text button</TextButton>
        <br/>
        <TextButton isUnderlined isActive={false}>Underlined text button</TextButton>
        <br/>
        <Button onClickAction={() => console.log('Click Text Button')}>Button with text only</Button>
        <br/>
        <Button isActive>
          <SvgDashboard />
          Button with icon in front of text
        </Button>
        <br/>
        {/* <IconButton size='xxl'  onClickAction={() => console.log('Click Icon Button')}>
          <SvgPeople />
        </IconButton>
        <br/>
        <IconButton isActive>
          <SvgPeople />
        </IconButton> */}
      </Main>
    </>
    )
  } else if (employee) {
    const initialEmployeeData = employees.filter(emp => emp._id === employee)[0]
    const { data, error } = useSWR(`api/employees/${employee}`, fetcher, { initialData: initialEmployeeData })

  if (error) return <h1>Something went wrong!</h1>
  if (!data) return <h1>Loading...</h1>

    console.log('BOARD DATA', employees, employee, initialEmployeeData,  data);

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
  } = data


  return (
    <>
      <Aside />
      <Main dashboard>
        <SubPagesProvider>
          <Header name={`${name} ${surname}`} position={position} id={_id} juvenile={juvenile_worker} status={employment_status}  />
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