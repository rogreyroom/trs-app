import Head from 'next/head'
import { getLayout } from '@/components/layouts/DashboardLayout'

const Dashboard = ({ children }) => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      { children }
    </>
  )
}

Dashboard.getLayout = getLayout
export default Dashboard