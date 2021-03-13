import styled from 'styled-components';
import { useContext, useState, useEffect } from 'react'
import { DashboardContext } from '@/contexts/DashboardContext'
import { TextButton } from '@/common/Buttons'
import { useRouter } from 'next/router'
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
  const [isActive, setIsActive] = useState('')
  const { data } = useSWR(`/api/employees`, { initialData: employees })

  // console.log('EmployeeList employee', employee, isActive);
  const router = useRouter()

  useEffect(() => {
    setEmployees(employees => data)
    employee && setIsActive(isActive => employee._id)
    // return () => {
    //   setEmployees(employees => employees)
    // }
  }, [data, employee])

  const getEmployeeData = (id) => data.filter(employee => employee._id === id)[0]

  const handleEmployeeClick = (e,id) => {
    e.preventDefault()
    setAddEmployeePage(addEmployeePage => null)
    const employeeData = getEmployeeData(id)
    employeeData && setEmployee(employee => employeeData)
    // console.log('handleEmployeeClick id', id, ' isActiveE ', isActive);
    setIsActive(isActive => id)
    // setIsActive(isActive => id)
    router.push('/dashboard')
  }

  return (
      <StyledList>
        {
          employees &&
          employees.map(({ _id, name, surname, employment_status }) => {
            return employment_status === employeesFilter ? (
            <StyledListItem key={ `${_id}${name}${surname}` }>
              <TextButton isActive={isActive === _id ? true : false} onClickAction={(e) => handleEmployeeClick(e,_id)}>
                {surname} {name}
              </TextButton>
            </StyledListItem>
            ) : null
          })
        }
      </StyledList>
)}