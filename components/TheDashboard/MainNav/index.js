import styled from 'styled-components';
import { useContext } from 'react'
import { SubPagesContext } from '@/contexts/SubPagesContext'
import { SvgHoliday, SvgSick, SvgLeave, SvgRts, SvgPdf } from '@/Icons'
import { IconButton } from '../../common/IconButton'


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

  return (
    <EmployeeMainNav>
    <IconButton type='button' size='xl' onClickAction={() => setPage('holiday')} localAction>
      <SvgHoliday />
    </IconButton>

    <IconButton type='button' size='xl' onClickAction={() => setPage('sick')} localAction>
      <SvgSick />
    </IconButton>

    <IconButton type='button' size='xl' onClickAction={() => setPage('leave')} localAction>
      <SvgLeave />
    </IconButton>

    <IconButton type='button' size='xl' onClickAction={() => setPage('rts')} localAction>
      <SvgRts />
    </IconButton>

    <IconButton type='button' size='xl' onClickAction={() => setPage('reports')} localAction>
      <SvgPdf />
    </IconButton>
  </EmployeeMainNav>
  )
}
