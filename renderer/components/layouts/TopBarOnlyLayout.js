import { AppContainer } from './AppContainer'
import { Header } from '@/components/TheTopBar'
import { Main } from '@/components/TheDashboard/Main'
import { SWRConfig } from 'swr'
import { axios } from '@/lib/axios-config'


const TopBarOnlyLayout = ({ children }) => {
  return (
    <AppContainer>
      <Header />
      <SWRConfig
        value={{
          refreshInterval: 2000,
          fetcher: (...args) => axios.get(...args).then(res => res.data)
        }}
      >
          <Main>
            { children }
          </Main>
      </SWRConfig>
    </AppContainer>
  )
}

export const getLayout = page => <TopBarOnlyLayout>{page}</TopBarOnlyLayout>

export default TopBarOnlyLayout