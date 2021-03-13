import { AppContainer } from '@/components/AppContainer'
import { Header } from '@/components/TheTopBar'
import { Main } from '@/components/TheDashboard/Main'

import { DashboardProvider } from '@/contexts/DashboardContext'

const TopBarOnlyLayout = ({ children }) => {
  return (
    <AppContainer>
      <Header />
      <DashboardProvider>
      <Main>
        { children }
      </Main>
      </DashboardProvider>
    </AppContainer>
  )
}

export const getLayout = page => <TopBarOnlyLayout>{page}</TopBarOnlyLayout>

export default TopBarOnlyLayout