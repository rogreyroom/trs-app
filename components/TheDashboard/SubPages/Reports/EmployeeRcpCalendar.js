import { useState, useContext, useRef } from 'react'
import { DashboardContext } from '@/contexts/DashboardContext'
import format from 'date-fns/format'
import { useReactToPrint } from 'react-to-print'
import { EmployeeCalendar } from './Print'
import { IconButton } from '@/common/Buttons'
import { SvgPrint } from '@/icons'
import { getGivenMonthData } from '@/lib/utils'
import styled from 'styled-components';

const StyledRcpDetailsPrint = styled.section`
  & button {
    margin-left: var(--xxl);
  }
`

const EmployeeRcpCalendar = ({year, month}) => {
  const [employee, setEmployee] = useContext(DashboardContext).employee
  const componentRef = useRef()
  const currentMonthData = getGivenMonthData(employee.calendar, year, month)[0]
  const employeeFullName = `${employee.name} ${employee.surname}`

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })

  return (
    <StyledRcpDetailsPrint>

      <IconButton size='xl' isActive={false} onClickAction={handlePrint}>
        <SvgPrint />
      </IconButton>
      { currentMonthData && <EmployeeCalendar employeeData={{ employeeName: employeeFullName, year: year, month: month, data: currentMonthData }} ref={componentRef} /> }

    </StyledRcpDetailsPrint>
  )
}

export default EmployeeRcpCalendar
