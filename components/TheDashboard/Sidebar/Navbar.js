import Link from 'next/link'
import styled from 'styled-components'
import { SvgOnSwitch, SvgOffSwitch, SvgPeople, SvgSwitch } from '@/components/Icons'
import { useContext } from 'react'
import { DashboardContext } from '@/contexts/DashboardContext'

const StyledNav = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: var(--l);
`

const StyledButton = styled.button`
  display: flex;
  background: transparent;
  box-shadow: none;
  color: ${props => props.active ? `var(--c-accent)` : `var(--c-white)`};
  text-align: center;
  text-decoration: none;
  border: none;
  margin: 0;
  padding: 0;
  -webkit-appearance: none;
  -moz-appearance: none;
  cursor: pointer;
  transition: all 250ms ease-in-out;

  & > svg {
    width: var(--xl);
    height: var(--xl);
  }

  &:hover > svg   {
    filter: var(--s-glow);
    color: var(--c-accent);
  }
`

export const Navbar = () => {
  const [employeesFilter, setEmployeesFilter] = useContext(DashboardContext).filter
  const [addEmployeePage, setAddEmployeePage] = useContext(DashboardContext).add

  return (
    <StyledNav>
        <StyledButton type='button' active={addEmployeePage} onClick={() => setAddEmployeePage(true)}>
          <SvgPeople />
        </StyledButton>
      <StyledButton type='button' active={employeesFilter} onClick={() => setEmployeesFilter(employeesFilter => !employeesFilter)}>
        { employeesFilter && ( <SvgOnSwitch /> ) || ( <SvgOffSwitch /> )}
      </StyledButton>
    </StyledNav>
  )
}