import { useRouter } from 'next/router'
import styled from 'styled-components'
import { IconButton, Button  } from '@/components/common/Buttons'
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
  const router = useRouter()

  return (
    <StyledNav>
      <Button isActive={router.route === '/dashboard' ? true : false} onClickAction={() => router.push('/dashboard')} >
        <SvgDashboard />
        Panel kierownika
      </Button>
      <Button isActive={router.route === '/dashboard/ees' ? true : false} onClickAction={() => router.push('/dashboard/ees')} >
        <SvgEes />
        SOP
      </Button>
      <Button isActive={router.route === '/dashboard/reports' ? true : false} onClickAction={() => router.push('/dashboard/reports')} >
        <SvgPdf />
        Raporty
      </Button>
      <IconButton size='l' onClickAction={() => router.push('/')}>
        <SvgLogout />
      </IconButton>
    </StyledNav>
  )
}

