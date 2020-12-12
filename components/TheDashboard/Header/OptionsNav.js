import styled from 'styled-components';
import { useContext, useState } from 'react'
import { SvgEdit, SvgOnSwitch, SvgOffSwitch, SvgYoung } from '@/Icons'
import { IconButton } from '@/components/common/Buttons'
import { SubPagesContext } from '@/contexts/SubPagesContext';

const EmployeeOptionsNav = styled.nav`
grid-area: employee-nav;
display: flex;
justify-content: flex-start;
gap: var(--xs);
padding-left: var(--normal);
`



export const OptionsNav = ({ employee, juvenile, status}) => {
  const [page, setPage] = useContext(SubPagesContext)
  const [isClicked, setIsClicked] = useContext(SubPagesContext)

  const handleSubPageClick = (pageName) => {
    setPage(pageName)
    setIsClicked(isClicked => pageName)
  }

  const handleYoungSwitch = () => {
    console.log('handleYoungSwitch')
  }

  return (
    <EmployeeOptionsNav>
      <IconButton size='xl' isActive={isClicked === 'edit' ? true : false} onClickAction={() => handleSubPageClick('edit')} >
        <SvgEdit />
      </IconButton>

      <IconButton size='xl' isActive={status} onClickAction={() => handleSubPageClick('status')} >
       { status && ( <SvgOnSwitch /> ) || ( <SvgOffSwitch /> )}
      </IconButton>

      <IconButton size='xl' isActive={juvenile} onClickAction={handleYoungSwitch}>
        <SvgYoung />
      </IconButton>
    </EmployeeOptionsNav>
  )
}