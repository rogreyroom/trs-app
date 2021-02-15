import styled from 'styled-components';
import { useContext, useState, useEffect } from 'react'
import { DashboardContext } from '@/contexts/DashboardContext'
import { TextButton } from '@/common/Buttons'

import useSWR from 'swr'



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
  const { data } = useSWR(`/api/employees`, { initialData: employees })

  useEffect(() => {
    setEmployees(employees => data)
    return () => {
      setEmployees(employees => employees)
    }
  }, [data])

  const getEmployeeData = (id) => data.filter(employee => employee._id === id)[0]

  const handleEmployeeClick = (id) => {
    setAddEmployeePage(addEmployeePage => null)
    const employeeData = getEmployeeData(id)
    employeeData && setEmployee(employee => employeeData)
    setIsActive(isActive => id)
  }

  return (
      <StyledList>
        {
          employees &&
          employees.map(({ _id, name, surname, employment_status }) => {
            return employment_status === employeesFilter ? (
            <StyledListItem key={ `${_id}${name}${surname}` }>
              <TextButton isActive={isActive === _id ? true : false} onClickAction={() => handleEmployeeClick(_id)}>
                {surname} {name}
              </TextButton>
            </StyledListItem>
            ) : null
          })
        }
      </StyledList>
)}