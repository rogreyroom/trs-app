import Head from 'next/head'
import { useContext, useState, useEffect } from 'react'
import useSWR, { SWRConfig } from 'swr'
import { axios } from '@/lib/axios-config'
import { DashboardContext } from '@/contexts/DashboardContext'
import { getLayout } from '@/layouts/TopBarOnlyLayout'
import { ReportsHr } from '@/subPages/Reports/ReportsHr'


const fetcher = url => axios.get(url).then(res => res.data)

const Reports = ({ allEmployeesData }) => {
  const [isLoadingContext, setIsLoadingContext ] = useState(true)
  const [employees, setEmployees] = useContext(DashboardContext).data
  const { data, error } = useSWR('api/employees', fetcher, { initialData: allEmployeesData })

  const loadEmployeesDataToContext = async (employeesData) => {
    await setEmployees(employees => employeesData)
  }

  if (error) return <h1>Something went wrong on the server!</h1>
  if (!data) return <h1>Loading data from server...</h1>

  useEffect(() => {
    loadEmployeesDataToContext(data)
    setIsLoadingContext(isLoadingContext => false)
    return () => {
      setIsLoadingContext(isLoadingContext => true)
      setEmployees(employees => null)
    }
  }, [data])

  if (isLoadingContext) return <h1>Loading Context</h1>

  return (
    <>
      <Head>
        <title>Reports</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SWRConfig
        value={{
          refreshInterval: 2000,
          fetcher: (...args) => axios.get(...args).then(res => res.data)
        }}
      >
      <ReportsHr />
      </SWRConfig>
    </>
  )
}

export async function getServerSideProps(context) {
  const allEmployeesData = await fetcher('api/employees')

  // TODO: here should by handle update for every employee new year calendar

  return {
    props: {
      allEmployeesData
    }
  }
}


Reports.getLayout = getLayout
export default Reports