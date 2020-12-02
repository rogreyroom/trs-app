import { AppContainer } from '@/components/AppContainer'
import { Header } from '@/components/Header'
import { Aside } from '@/components/Aside'
import { Main } from '@/components/Main'


const DashboardLayout = ({ children }) => {
  return (
    <AppContainer dashboard>
      <Header />
      <Aside />
      <Main dashboard>
        { children }
      </Main>
    </AppContainer>
  )
}

export const getLayout = page => <DashboardLayout>{page}</DashboardLayout>

export default DashboardLayout