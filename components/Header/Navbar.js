import styled from 'styled-components'
import { Button } from './Button'
import { SvgEes, SvgPdf } from '@/Icons'

const StyledNav = styled.nav`
  display: flex;
  margin: 0;

  > :last-child {
    margin-left: var(--l);
  }
`

export const Navbar = () => {
  return (
    <StyledNav>
      <Button href='/dashboard/ees'>
        <SvgEes />
        SOP
      </Button>
      <Button href='/dashboard/reports'>
        <SvgPdf />
        Raporty
      </Button>
    </StyledNav>
  )
}

