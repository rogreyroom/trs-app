import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { SvgOnSwitch, SvgOffSwitch, SvgPeople, SvgSwitch } from '@/components/Icons'


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
  color: var(--c-white);
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
  const [toggle, setToggle] = useState(true)
  const router = useRouter()

  const handleSwitchEmployees = (e) => {
    setToggle(toggle => !toggle)
    console.log('Filter employee list between active and inactive', toggle);
  }

  return (
    <StyledNav>
      <Link href='/dashboard/employee/add'>
        <StyledButton>
          <SvgPeople />
        </StyledButton>
      </Link>
      <StyledButton type='button' onClick={handleSwitchEmployees}>
        { toggle && ( <SvgOnSwitch /> ) || ( <SvgOffSwitch /> )}
      </StyledButton>
    </StyledNav>
  )
}
