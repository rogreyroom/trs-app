import styled from 'styled-components'
import { Button } from './Button'
import { IconButton } from '@/components/IconButton'
import { SvgDashboard, SvgEes, SvgPdf, SvgLogout } from '@/Icons'

const StyledNav = styled.nav`
  display: flex;
  margin: 0;

  & button {
    margin-left: var(--l);
  }

  > :first-child {
      margin-left:  0;
    }
`

export const Navbar = () => {
  return (
    <StyledNav>
      <Button href='/dashboard/'>
        <SvgDashboard />
        Panel kierownika
      </Button>
      <Button href='/dashboard/ees'>
        <SvgEes />
        SOP
      </Button>
      <Button href='/dashboard/reports'>
        <SvgPdf />
        Raporty
      </Button>
      <IconButton href='/' size='l'>
        <SvgLogout />
      </IconButton>
    </StyledNav>
  )
}

