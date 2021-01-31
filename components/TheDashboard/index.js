import { useContext } from 'react'
import { DashboardContext } from '@/contexts/DashboardContext'
import { SubPagesProvider } from '@/contexts/SubPagesContext'
import { Title } from "@/common/Title"
import { AddEmployeePage } from '@/subPages/Employee/AddEmployee'
import { Header } from './Header'
import { MainNav } from './MainNav'
import { DetailsSection } from './DetailsSection'
import { ContentSection } from './ContentSection'

// TO be fixed
import { Aside } from '@/components/TheDashboard/Sidebar'
import { Main } from '@/components/TheDashboard/Main'

export const Board = () => {
  const [employee, setEmployee] = useContext(DashboardContext).employee
  const [addEmployeePage, setAddEmployeePage] = useContext(DashboardContext).add

  console.log('Board addEmployeePage', addEmployeePage, 'employee', employee);

  if ( addEmployeePage ) {
    return (
    <>
      <Aside />
      <Main>
        <Title isWhite>Dodaj pracownika</Title>
        <AddEmployeePage />
      </Main>
    </>
    )
  } else if (employee) {
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
    } = employee

    return (
      <>
        <Aside />
        <Main dashboard>
          <SubPagesProvider>
            <Header employeeId={_id} name={`${name} ${surname}`} position={position} juvenile={juvenile_worker} status={employment_status}  />
            <MainNav employeeId={_id} />
            <DetailsSection employeeCalendar={calendar} assignedLeaveDays={{overdue: overdue_leave_amount, assigned: assigned_leave_amount}} employmentDates={{start: employment_start_date, end: employment_termination_date}}/>
            <ContentSection employeeId={_id} />
          </SubPagesProvider>
        </Main>
      </>
    )

  } else {
      return <Aside />
  }
}