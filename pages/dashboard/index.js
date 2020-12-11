import Head from 'next/head'
import { useContext } from 'react'
import useSWR from 'swr'
import { axios } from '@/lib/axios-config'
import { DashboardContext } from '@/contexts/DashboardContext'
import { getLayout } from '@/components/layouts/DashboardLayout'
import { Board } from '@/components/TheDashboard'

const fetcher = url => axios.get(url).then(res => res.data)

const Dashboard = ({ allEmployeesData }) => {
  const [employees, setEmployees] = useContext(DashboardContext).data
  const { data, error } = useSWR('api/employees', fetcher, { initialData: allEmployeesData })

  if (error) return <h1>Something went wrong!</h1>
  if (!data) return <h1>Loading...</h1>
  setEmployees(data)

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Board />
    </>
  )
}

export async function getServerSideProps(context) {
  const allEmployeesData = await fetcher('api/employees')

  return {
    props: {
      allEmployeesData
    }
  }
}

Dashboard.getLayout = getLayout
export default Dashboard