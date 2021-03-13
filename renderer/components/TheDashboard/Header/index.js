import { useState, useEffect, useContext } from 'react';
import { DashboardContext } from '@/contexts/DashboardContext'
import styled from 'styled-components';
import { OptionsNav } from './OptionsNav'

const EmployeeHeader = styled.header`
grid-area: title;
display: grid;
grid-template-columns: auto 1fr;
grid-template-rows: 32px 18px;

& h1 {
  grid-column: 1 / 2;
  grid-row: 1;
  margin: 0;
  align-self: start;
}

& span {
  grid-column: 1 / 2;
  grid-row: 2;
  margin: 0;
  font-size: var(--s);
  font-weight: var(--fw-light);
  color: var(--c-blue-03);
  align-self: end;
}

& nav {
  grid-column: 2 / 3;
  grid-row: 1 / 3;
  align-items: center;
  margin: 0;
}
`

const StyledTitle = styled.h1`
  font-size: var(--l);
  color: var(--c-accent);
  margin: 0;
`


export const Header = ({ employeeId }) => {
  const [employee, setEmployee] = useContext(DashboardContext).employee
  const [employeeChange, setEmployeeChange] = useState(null)
  const [employeeData, setEmployeeData] = useState({ id: employee._id, name: `${employee.name} ${employee.surname}`, position: employee.position, juvenile: employee.juvenile, status: employee.status  } || {})

  useEffect(() => {
    if (employeeChange !== employeeId) {
      setEmployeeChange(employeeChange => employeeId)
    }
    setEmployeeData(employeeData => employeeData = { id: employee._id, name: `${employee.name} ${employee.surname}`, position: employee.position, juvenile: employee.juvenile, status: employee.status  })
  }, [employeeId, employee])

  return (
    <EmployeeHeader>
      <StyledTitle>{ employeeData.name }</StyledTitle>
      <OptionsNav id={employeeData.id} />
      <span>{ employeeData.position }</span>
    </EmployeeHeader>
  )
}

