import styled from 'styled-components'
import { useContext } from 'react'
import { DashboardContext } from '@/contexts/DashboardContext'
import { IconButton } from '@/common/Buttons'
import { SvgOnSwitch, SvgOffSwitch, SvgPeople } from '@/icons'
import { useRouter } from 'next/router'

const StyledNav = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: var(--l);
`

export const Navbar = () => {
  const [employeesFilter, setEmployeesFilter] = useContext(DashboardContext).filter
  const [addEmployeePage, setAddEmployeePage] = useContext(DashboardContext).add
  const router = useRouter()

  const handleFilter = () => {
    setEmployeesFilter(employeesFilter => !employeesFilter)
  }

  const handleAddEmployeeClick = () => {
    setAddEmployeePage(addEmployeePage => true)
    router.push('/add-employee')
  }

  return (
    <StyledNav>
      <IconButton size='xl' isActive={addEmployeePage} onClickAction={handleAddEmployeeClick}>
        <SvgPeople />
      </IconButton>
      <IconButton size='xl' isActive={employeesFilter} onClickAction={handleFilter}>
        { employeesFilter && ( <SvgOnSwitch /> ) || ( <SvgOffSwitch /> )}
      </IconButton>
    </StyledNav>
  )
}