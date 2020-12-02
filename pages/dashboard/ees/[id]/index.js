import Head from 'next/head'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import AppLayout from '../../../components/layouts/AppLayout'
import { Title } from '../../../components/Title'
import EesForm from '../../../components/EesForm'

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function EesEdit() {
  const router = useRouter()
  const { id } = router.query
  const url = `http://localhost:3000/api/ees/${id}`
  const { data, error } = useSWR(url, fetcher)


  return (
    <>
      <Head>
        <title>SOP - System Oceny Pracownika - Edycja</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppLayout>
        <header>
          <Title>
            System Oceny Pracownika - Edycja
          </Title>
        </header>
        {
          error ? <div>Error...</div> : data ? <EesForm preloadedValues={data} /> : <div>Loading...</div>
        }
      </AppLayout>
    </>
  )
}

