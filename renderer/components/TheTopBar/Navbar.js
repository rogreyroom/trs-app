import { useRouter } from 'next/router'
import styled from 'styled-components'
import { IconButton, Button  } from '@/common/Buttons'
import { SvgDashboard, SvgEes, SvgPdf, SvgLogout } from '@/icons'

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
  const router = useRouter()

  return (
    <StyledNav>
      <Button isActive={router.route === '/employees' ? true : false} onClickAction={() => router.push('/employees')} >
        <SvgDashboard />
        Panel kierownika
      </Button>
      <Button isActive={router.route === '/ees' ? true : false} onClickAction={() => router.push('/ees')} >
        <SvgEes />
        SOP
      </Button>
      <Button isActive={router.route === '/reports' ? true : false} onClickAction={() => router.push('/reports')} >
        <SvgPdf />
        Raporty
      </Button>
      <IconButton size='l' onClickAction={() => router.push('/')}>
        <SvgLogout />
      </IconButton>
    </StyledNav>
  )
}

