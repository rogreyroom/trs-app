import styled from 'styled-components';
import { useContext, useState } from 'react'
import { DashboardContext } from '@/contexts/DashboardContext'


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
  display: block;
  color: var(--c-white);
  text-align: right;
  margin: 0;
  padding: var(--xxs) var(--normal) var(--xxs) var(--xxs);
  width: 100%;
`

const StyledButton = styled.button`
  --text-color: ${props => props.active ? `var(--c-accent)` : `var(--c-white)`};

  display: inline-block;
  border: none;
  padding: 0;
  margin: 0;
  text-decoration: none;
  background: transparent;
  color: var(--text-color);
  font-family: inherit;
  font-size: var(--fs-text);
  line-height: 1;
  height: max-content;
  cursor: pointer;
  text-align: center;
  -webkit-appearance: none;
  -moz-appearance: none;
  align-self: center;

  &:hover {
    --text-color: var(--c-accent);
    filter: var(--s-glow);
  }

  &:focus {
    outline: 3px solid transparent;
    box-shadow: 0 0 1px 2px var(--c-accent);
    filter: var(--s-glow);
  }
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
              <StyledButton type='button'  active={isActive === _id ? true : false} onClick={() => handleEmployeeClick(_id)}>
                {surname} {name}
              </StyledButton>
            </StyledListItem>
            ) : null
          ))
        }
      </StyledList>
)}