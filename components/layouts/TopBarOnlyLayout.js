import { AppContainer } from '@/components/AppContainer'
import { Header } from '@/components/Header'
import { Main } from '@/components/Main'


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