import styled from 'styled-components'
import { LogoTitle } from './LogoTitle'
import { Button } from './Button'
import { SvgEes } from './Icons/EesIcon'
import { SvgPdf } from './Icons/PdfIcon'

const TopBarContainer = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: var(--xl);
`
const Navigation = styled.nav`
  display: flex;
  margin: 0;

  > :last-child {
    margin-left: var(--l);
  }
`

export const TopBar = () => {
  return (
    <TopBarContainer>
      <LogoTitle  href="/">RTS</LogoTitle>
      <Navigation>
        <Button href='/ees'>
          <SvgEes />
          SOP
        </Button>
        <Button href='/reports'>
          <SvgPdf />
          Raporty
        </Button>
      </Navigation>
    </TopBarContainer>
  )
}