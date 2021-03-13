import Head from 'next/head'
import { useRouter } from 'next/router'
import useSWR from 'swr'
// import TopBarOnlyLayout from '@/layouts/TopBarOnlyLayout'
import { getLayout } from '@/layouts/TopBarOnlyLayout'
// import { getLayout } from '@/layouts/DashboardLayout'
import { Title } from '@/common/Title'
import { EesForm } from '@/dashboard/Ees'
import { axios } from '@/lib/axios-config'

const fetcher = url => axios.get(url).then(res => res.data)

const EesEdit = () => {
  const router = useRouter()
  const { id } = router.query

  const { data, error } = useSWR(`api/ees/${id}`, fetcher)

  if (error) return <h1>Something went wrong on the server!</h1>
  if (!data) return <h1>Loading data from server...</h1>

  return (
    <>
      <Head>
        <title>SOP - System Oceny Pracownika - Edycja</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <header>
          <Title>
            System Oceny Pracownika - Edycja
          </Title>
        </header>
        <EesForm preloadedValues={data} />
        {/* {
          error ? <div>Error...</div> : data ? <Ees preloadedValues={data} /> : <div>Loading...</div>
        } */}
    </>
  )
}

EesEdit.getLayout = getLayout
export default EesEdit