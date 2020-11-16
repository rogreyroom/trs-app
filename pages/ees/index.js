import { useRouter } from 'next/router'
import Head from 'next/head'
import { axios } from '../../lib/axios-config'
import styled from 'styled-components'
import AppLayout from '../../components/layouts/AppLayout'
import { Title } from '../../components/Title'
import { IconButton } from '../../components/IconButton'
import { SvgEdit } from '../../components/Icons/EditIcon'
import { StyledTable, StyledThead, StyledTbody, StyledTr, StyledTh, StyledTd } from '../../components/styled/StyledTableComponents'

export default function Ees({ allEesData }) {
  return (
    <>
      <Head>
        <title>SOP - System Oceny Pracownika</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppLayout>
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
          <StyledTbody>
          {allEesData.map(({ _id, symbol, percent, description }) => (
            <StyledTr key={_id}>
              <StyledTd>
                <IconButton size='m' href={`/ees/${encodeURIComponent(_id)}`}>
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
          </StyledTbody>
        </StyledTable>
        )}
      </AppLayout>
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
