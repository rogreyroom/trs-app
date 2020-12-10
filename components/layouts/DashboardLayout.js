import { DashboardProvider } from '@/contexts/DashboardContext'
import { AppContainer } from '@/components/AppContainer'
import { Header } from '@/components/Header'

const DashboardLayout = ({ children }) => {
  return (
    <AppContainer dashboard>
      <Header />
      <DashboardProvider>
        { children }
      </DashboardProvider>
    </AppContainer>
  )
}

export const getLayout = page => <DashboardLayout>{page}</DashboardLayout>

export default DashboardLayout