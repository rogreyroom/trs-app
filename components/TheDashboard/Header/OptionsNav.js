import styled from 'styled-components';
import { useState } from 'react'
import { SvgEdit, SvgOnSwitch, SvgOffSwitch, SvgYoung } from '@/Icons'
import { IconButton } from '@/components/common/IconButton'

const EmployeeOptionsNav = styled.nav`
grid-area: employee-nav;
display: flex;
justify-content: flex-start;
gap: var(--xs);
padding-left: var(--normal);
`



export const OptionsNav = ({juvenile, status}) => {
  const [toggle, setToggle] = useState(status)
  // const [young, setYoung] = useState(young => juvenile)

  const handleActiveSwitch = () => {
    setToggle(toggle => !toggle)
    console.log('handleActiveSwitch')
  }

  const handleYoungSwitch = () => {
    // setYoung(young => !young)
    console.log('handleYoungSwitch')
  }

  return (
    <EmployeeOptionsNav>
      <IconButton size='xl' href='/edit'>
        <SvgEdit />
      </IconButton>

      <IconButton size='xl' localAction isActive={toggle} onClickAction={handleActiveSwitch}>
       { toggle && ( <SvgOnSwitch /> ) || ( <SvgOffSwitch /> )}
      </IconButton>

      <IconButton size='xl' localAction isJuvenile={juvenile} onClick={handleYoungSwitch}>
        <SvgYoung />
      </IconButton>
    </EmployeeOptionsNav>
  )
}