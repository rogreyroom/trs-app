import styled from 'styled-components';
import { useContext, useState } from 'react'
import { DashboardContext } from '@/contexts/DashboardContext'
import { TextButton } from '@/components/common/Buttons';



const StyledList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  padding-top: var(--normal);
  display: flex;
  flex-direction: column;
  height: 100%;
`
const StyledListItem = styled.li`
  display: flex;
  color: var(--c-white);
  text-align: right;
  margin: 0;
  padding: var(--xxs) var(--normal) var(--xxs) var(--xxs);
  width: 100%;
  height: var(--xl);
  align-content: center;
  justify-content: flex-end;
`

const StyledInfo = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;

  h1 {
    color: var(--c-white);
    font-family: inherit;
    font-size: var(--fs-text);
  }

  /* maybe add some spinner + styles when loading */
`

export const EmployeeList = () => {
  const [employees, setEmployees] = useContext(DashboardContext).data
  const [employeesFilter, setEmployeesFilter] = useContext(DashboardContext).filter
  const [employee, setEmployee] = useContext(DashboardContext).employee
  const [addEmployeePage, setAddEmployeePage] = useContext(DashboardContext).add
  const [isActive, setIsActive] = useState(false)

  const handleEmployeeClick = (id) => {
    setAddEmployeePage(null)
    setEmployee(id)
    setIsActive(isActive => id)
  }

  return (
      <StyledList>
        {
          employees &&
          employees.map(({ _id, name, surname, employment_status }) => (
            employment_status === employeesFilter ? (
            <StyledListItem key={ _id }>
              <TextButton isActive={isActive === _id ? true : false} onClickAction={() => handleEmployeeClick(_id)}>
                {surname} {name}
              </TextButton>
            </StyledListItem>
            ) : null
          ))
        }
      </StyledList>
)}