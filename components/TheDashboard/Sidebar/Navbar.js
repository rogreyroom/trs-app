import styled from 'styled-components'
import { useContext } from 'react'
import { DashboardContext } from '@/contexts/DashboardContext'
import { IconButton } from '@/components/common/Buttons'
import { SvgOnSwitch, SvgOffSwitch, SvgPeople, SvgSwitch } from '@/components/Icons'

const StyledNav = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: var(--l);
`

export const Navbar = () => {
  const [employeesFilter, setEmployeesFilter] = useContext(DashboardContext).filter
  const [addEmployeePage, setAddEmployeePage] = useContext(DashboardContext).add

  return (
    <StyledNav>
      <IconButton size='xl' isActive={addEmployeePage} onClickAction={() => setAddEmployeePage(true)}>
        <SvgPeople />
      </IconButton>
      <IconButton size='xl' isActive={employeesFilter} onClickAction={() => setEmployeesFilter(employeesFilter => !employeesFilter)}>
        { employeesFilter && ( <SvgOnSwitch /> ) || ( <SvgOffSwitch /> )}
      </IconButton>
    </StyledNav>
  )
}