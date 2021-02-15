import { useRouter } from 'next/router'
import Head from 'next/head'
import styled from 'styled-components'
import { axios } from '@/lib/axios-config'
import { getLayout } from '@/layouts/TopBarOnlyLayout'
import { Title } from '@/common/Title'
import { IconButton } from '@/common/Buttons'
import { SvgEdit } from '@/icons'
import { StyledTable, StyledThead, StyledTBody, StyledTr, StyledTh, StyledTd } from '@/common/Table'

const Ees = ({ allEesData }) => {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>SOP - System Oceny Pracownika</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
        <header>
          <Title>
            System Oceny Pracownika
          </Title>
        </header>
        {allEesData && (
        <StyledTable>
          <StyledThead>
            <StyledTr>
              <StyledTh>Edycja</StyledTh>
              <StyledTh>Symbol</StyledTh>
              <StyledTh>%</StyledTh>
              <StyledTh>Zasada przyznania premii</StyledTh>
            </StyledTr>
          </StyledThead>
          <StyledTBody>
          {allEesData.map(({ _id, symbol, percent, description }) => (
            <StyledTr key={_id}>
              <StyledTd>
                <IconButton size='m' onClickAction={() => router.push(`/dashboard/ees/${encodeURIComponent(_id)}`)} >
                  <SvgEdit/>
                </IconButton>
              </StyledTd>
              <StyledTd>
                {symbol}
              </StyledTd>
              <StyledTd>
                {percent}%
              </StyledTd>
              <StyledTd>
                {description}
              </StyledTd>
            </StyledTr>
          ))}
          </StyledTBody>
        </StyledTable>
        )}
      </>
    </>
  )
}

export async function getServerSideProps(context) {
  const res = await axios.get('api/ees').catch(error => `Timeout exceeded ${error}`)

  const allEesData = (res && res.data) ? await res.data : []



  return {
    props: {
      allEesData
    }
  }
}

Ees.getLayout = getLayout
export default Ees
