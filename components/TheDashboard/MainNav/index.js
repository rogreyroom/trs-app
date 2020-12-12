import styled from 'styled-components';
import { useContext, useState } from 'react'
import { SubPagesContext } from '@/contexts/SubPagesContext'
import { SvgHoliday, SvgSick, SvgLeave, SvgRts, SvgPdf } from '@/Icons'
import { IconButton } from '@/components/common/Buttons'


const EmployeeMainNav = styled.nav`
grid-area: employee-nav;
display: flex;
justify-content: flex-end;
align-items: center;
margin: 0;
background-image: var(--g-sub-nav);

& button {
  margin-left: var(--xxs);
}
`

export const MainNav = ({ employee }) => {
  const [page, setPage] = useContext(SubPagesContext)
  const [isClicked, setIsClicked] = useContext(SubPagesContext)

  const handleSubPageClick = (pageName) => {
    setPage(pageName)
    setIsClicked(isClicked => pageName)
  }

  return (
    <EmployeeMainNav>
    <IconButton size='xl' isActive={isClicked === 'holiday' ? true : false} onClickAction={() => handleSubPageClick('holiday')} >
      <SvgHoliday />
    </IconButton>

    <IconButton size='xl' isActive={isClicked === 'sick' ? true : false} onClickAction={() => handleSubPageClick('sick')} >
      <SvgSick />
    </IconButton>

    <IconButton size='xl' isActive={isClicked === 'leave' ? true : false} onClickAction={() => handleSubPageClick('leave')} >
      <SvgLeave />
    </IconButton>

    <IconButton size='xl' isActive={isClicked === 'rts' ? true : false} onClickAction={() => handleSubPageClick('rts')} >
      <SvgRts />
    </IconButton>

    <IconButton size='xl' isActive={isClicked === 'reports' ? true : false} onClickAction={() => handleSubPageClick('reports')} >
      <SvgPdf />
    </IconButton>
  </EmployeeMainNav>
  )
}
