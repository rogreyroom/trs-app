import { AppContainer } from '@/components/AppContainer'
import { Header } from '@/components/TheTopBar'
import { Main } from '@/components/TheDashboard/Main'


const TopBarOnlyLayout = ({ children }) => {
  return (
    <AppContainer>
      <Header />
      <Main>
        { children }
      </Main>
    </AppContainer>
  )
}

export const getLayout = page => <TopBarOnlyLayout>{page}</TopBarOnlyLayout>

export default TopBarOnlyLayout