import Head from 'next/head'
import { getLayout } from '../../components/layouts/DashboardLayout'
import styled from 'styled-components';


const Reports = () => {
  return (
    <>
      <Head>
        <title>Reports</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>My Reports</h1>
    </>
  )
}



Reports.getLayout = getLayout

export default Reports