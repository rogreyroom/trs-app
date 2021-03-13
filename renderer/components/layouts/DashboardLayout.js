import { AppContainer } from './AppContainer'
import { DashboardProvider } from '@/contexts/DashboardContext'
import { Header } from '@/components/TheTopBar'
import { SWRConfig } from 'swr'
import { axios } from '@/lib/axios-config'

const DashboardLayout = ({ children }) => {
  return (
    <AppContainer dashboard>
      <Header />
      <SWRConfig
        value={{
          refreshInterval: 2000,
          fetcher: (...args) => axios.get(...args).then(res => res.data)
        }}
      >
        <DashboardProvider>
          { children }
        </DashboardProvider>
      </SWRConfig>
    </AppContainer>
  )
}

export const getLayout = page => <DashboardLayout>{page}</DashboardLayout>

export default DashboardLayout